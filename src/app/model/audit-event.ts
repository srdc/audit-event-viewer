import {Base64} from 'app/services/base64.service';

export class AuditEvent {

  private static codesystems = {
    'http://hl7.org/fhir/restful-interaction': 'REST',
    'http://nema.org/dicom/dicm': 'DCM',
    'http://hl7.org/fhir/resource-types': 'FHIR'
  };
  private static display = {
    'http://hl7.org/fhir/audit-event-type': {
      'rest': 'RESTful Operation'
    }
  };
  private static actionCodes = {
    'C': 'Create',
    'R': 'Read',
    'U': 'Update',
    'D': 'Delete',
    'E': 'Execute'
  }

  jsonResource: any;
  rawResource: string;
  fullUrl: string;
  id: string;
  date: Date;
  requestor: string;
  triggeringSystem: string;
  triggeringSystemAddress: string;
  targetSystem: string;
  targetSystemAddress: string;
  action: string;
  actionCode: string;
  actionType: string;
  actionSubType: string[] = [];
  dataOwner: string;
  object: string;
  objectLink: string;
  outcome: string;
  outcomeCode: string;
  outcomeColor: string;
  source: string;
  sourceSystem: string;

  constructor(resp: any, private base64: Base64) {
    this.jsonResource = resp;
    this.rawResource = JSON.stringify(resp, null, 4);
    this.fullUrl = resp.fullUrl;
    this.id = '#';
    const resource = resp.resource;
    if (!resource) {
      return this;
    }
    this.id = resource.id;
    this.date = resource.recorded ? new Date(resource.recorded) : null;
    try {
      this.actionType = resource.type ? AuditEvent.display[resource.type.system][resource.type.code] : null;
    } catch (err) {
      this.actionType = resource.type.code || null;
    }
    if (resource.subtype) {
      resource.subtype.forEach((type) => {
        if (type.code) {
          this.actionSubType.push(type.code);
        }
      });
    }
    this.source = (resource.source && resource.source.identifier) ? resource.source.identifier.value : null;
    if (resource.agent) {
      for (const participant of resource.agent) {
        if (participant.requestor) {
          this.requestor = participant.name || (participant.userId && participant.userId.value) || participant.altId ||
            (participant.network && participant.network.address);
        }
        if (participant.role) {
          for (const role of participant.role) {
            if (role.coding) {
              for (const coding of role.coding) {
                if (AuditEvent.codesystems[coding.system] === 'DCM') {
                  if (coding.code === '110153') {
                    this.triggeringSystem = participant.name || (participant.userId && participant.userId.value) ||
                      (participant.network && participant.network.address);
                    this.triggeringSystemAddress = (participant.network && participant.network.address
                      && (this.triggeringSystem === participant.network.address)) ? participant.network.address : null;
                    if (this.source && (this.source === participant.name
                        || (participant.network && (this.source === participant.network.address)))) {
                      this.sourceSystem = 'triggering';
                    }
                  } else if (coding.code === '110152') {
                    this.targetSystem = participant.name || (participant.userId && participant.userId.value) ||
                      (participant.network && participant.network.address);
                    this.targetSystemAddress = (participant.network && participant.network.address
                      && (this.targetSystem === participant.network.address)) ? participant.network.address : null;
                    if (this.source && (this.source === participant.name
                        || (participant.network && (this.source === participant.network.address)))) {
                      this.sourceSystem = 'target';
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    this.actionCode = resource.action;
    this.action = resource.action ? (AuditEvent.actionCodes[resource.action] || resource.action)
      : (resource.subtype && (resource.subtype.length > 0) && resource.subtype[0].coding
        && resource.subtype[0].coding[0].length > 0) ?
        AuditEvent.codesystems[resource.subtype[0].coding[0].system] + ': ' + resource.subtype[0].coding[0].code : null;
    if (resource.entity) {
      for (const entity of resource.entity) {
        if (entity.type) {
          if (entity.type.code === '1' && entity.type.system === 'http://hl7.org/fhir/audit-entity-type') {
            if (entity.name) {
              this.dataOwner = entity.name;
            } else if (entity.reference) {
              if (entity.reference.display) {
                this.dataOwner = entity.reference.display;
              } else if (entity.reference.reference) {
                this.dataOwner = entity.reference.reference;
              }
            }
          } else if (entity.role && entity.role.system === 'http://hl7.org/fhir/object-role') {
            if (entity.role.code === '24' && entity.query) {
              this.object = 'Query';
              this.objectLink = this.base64.decode(entity.query);
            } else {
              this.object = entity.type.code;
              this.objectLink = (entity.reference && entity.reference.reference) || '#';
            }
          }
        }
      }
    }
    this.outcomeCode = resource.outcome;
    switch (resource.outcome) {
      case '0':
        this.outcome = 'Success';
        this.outcomeColor = 'green';
        break;
      case '4':
        this.outcome = 'Minor Failure';
        this.outcomeColor = 'yellow';
        break;
      case '8':
        this.outcome = 'Serious Failure';
        this.outcomeColor = 'orange';
        break;
      case '12':
        this.outcome = 'Major Failure';
        this.outcomeColor = 'red';
        break;
      default:
        this.outcome = null;
        this.outcomeColor = '';
        break;
    }
  }
}
