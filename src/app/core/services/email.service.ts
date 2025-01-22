import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private userID = 'h2VoBOCLV7AWgjwCt';
  private serviceID = 'service_hs222zt';
  private templateID = 'template_dlif48x';

  constructor() {}

  sendEmail(data: { user_name: string; equipment_name: string; email: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, data, this.userID);
  }
}
