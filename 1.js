{
    "timeZone": "Asia/Kolkata",
    "dependencies": {
    },
    "exceptionLogging": "STACKDRIVER",
    "runtimeVersion": "V8",
    "oauthScopes":[
        "https://mail.google.com/",
        "https://www.googleapis.com/auth/gmail.addons.current.action.compose",
        "https://www.googleapis.com/auth/gmail.addons.execute",
        "https://www.googleapis.com/auth/gmail.addons.current.message.metadata",
        "https://www.google.com/m8/feeds"
    ],
    "addOns":{
      "common":{
        "name":"Gmail AddOn",
        "logoUrl":"https://www.gstatic.com/images/branding/product/1x/chat_24dp.png",
        "layoutProperties":{
          "primaryColor":"#2772ed"
        },
        "homepageTrigger":{
          "runFunction":"onComposeClick"
        }
      },
      "gmail":{
        "composeTrigger": {
          
            "draftAccess": "METADATA",
            "selectActions": [
              {
                "runFunction": "onComposeClick",
                "text": ""
              }
            ]
        }
      }
    }
  }




function onComposeClick(e) {
    return [buildComposeCard(e)];
  }
  
  function buildComposeCard(e) {
  
    var card = CardService.newCardBuilder();
    var cardSection = CardService.newCardSection().setHeader('Recipient Setter');
  
    var header = CardService.newCardHeader()
      .setTitle('Recipient Setter')
      .setSubtitle('AddOn for Gmail to help updating recipient emails.')
      .setImageUrl('https://ssl.gstatic.com/docs/script/images/logo/script-64.png')
  
    var fixedFooter = CardService.newFixedFooter()
      .setPrimaryButton(
        CardService.newTextButton()
          .setText('Update Email List')
          .setOnClickAction(CardService.newAction()
            .setFunctionName('updateEmail'))).setSecondaryButton(
              CardService.newTextButton()
              .setText('Search')
          .setOnClickAction(CardService.newAction()
            .setFunctionName('searchUser')));
  
    cardSection.addWidget(
      CardService.newTextInput()
        .setFieldName('htmlTextInput')
        .setMultiline(true)
        .setTitle('Email Address')
        .setHint('Email Address'));
  
        var searchSection = CardService.newCardSection().addWidget(CardService.newTextInput()
        .setFieldName('searchKeyword')
        .setTitle('Search Keyword')
        .setHint('Search Keyword'));
  
    return card.setHeader(header).setFixedFooter(fixedFooter).addSection(cardSection).addSection(searchSection).build();
  }
  
  function searchUser(e){
    var keyword = e.commonEventObject.formInputs.searchKeyword.stringInputs.value[0];
    var contacts = ContactsApp.getContactsByName(keyword);
  
    var card = CardService.newCardBuilder();
    var resultSection= CardService.newCardSection();
  
    
  
    //var grid = CardService.newGrid().setNumColumns(1);
  
    contacts.forEach(c=>{
      var email = c.getEmailAddresses().length==0 ?'':c.getEmailAddresses()[0];
  
  var decoratedText = CardService.newDecoratedText()
      .setText(c.getFullName())
      .setBottomLabel(email)
      .setIcon(CardService.Icon.EMAIL)
      .setSwitchControl(CardService.newSwitch()
        .setFieldName("form_input_switch_key")
        .setValue("form_input_switch_value")
        .setOnChangeAction(CardService.newAction()
            .setFunctionName("handleSwitchChange")));
  
  /*
      var gridItem = CardService.newGridItem()
      .setIdentifier("contact-"+c.getId())
      .setTitle(c.getFullName())
      .setSubtitle(email)
      .setLayout(CardService.GridItemLayout.TEXT_ABOVE);
  
      grid.addItem(gridItem);
  */
      resultSection.addWidget(decoratedText);
    });
  
    return card.addSection(resultSection).build();
  }
  
  function handleSwitchChange(e){
  
  }
  
  function updateEmail(e) {
  
  
    var meta = e.draftMetadata;
    var subject = meta.subject.toString();
    var toRecipients = meta.toRecipients;
    var ccRecipients = meta.ccRecipients.toString();
    var bccRecipients = meta.bccRecipients.toString();
    var body = ""; //meta.body.toString();
    var email = e.commonEventObject.formInputs.htmlTextInput.stringInputs.value[0];
    var emails=email.split(',');
   // emails.foreach(function(em){
        toRecipients.push(email);
    //})
  
    //var toRecipientsString = toRecipients.toString();
  
    var response = CardService.newUpdateDraftActionResponseBuilder()
        .setUpdateDraftToRecipientsAction(CardService.newUpdateDraftToRecipientsAction().addUpdateToRecipients(toRecipients))
        .build()
    
    // Sending Email
   // var msgObject = {
   //   to: toRecipientsString,
   //   cc: ccRecipients,
   //   bcc: bccRecipients,
   //   subject: subject,
   //   htmlBody: body
   // }
    //sendEmail(msgObject);
  
    return response;
  }
  
  function sendEmail(msgObject) {
    MailApp.sendEmail(msgObject);
  }
  
  function onHomePage(e) {
    return createCard(e);
  }
  
  //function onComposeClick(e){
  //  Logger.log(e);
  //}
  
  function createCard(e){
    var builder=CardService.newCardBuilder();
  
    var section= CardService.newCardSection()
    .addWidget(CardService.newButtonSet()
    .addButton(CardService.newTextButton()
    .setText('Create Draft')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setOnClickAction(CardService.newAction().setFunctionName('populateGmail'))
    .setDisabled(false)));
  
    builder.addSection(section);
  
    return builder.build();
  }
  
  function populateGmail(e){
    var drafts= e.gmail.getDrafts();
    Logger.log(drafts);
    var d = GmailApp.createDraft('ankit.bhatnagar@searce.com','Test Subject','Test Body');
  
    //d.getId();
  
    var message=d.getMessage();
    d.update(message.getTo(),message.getSubject(),message.getBody(),{
      "cc":"test@test.com"
    });
  
  
    var accessToken=e.gmail.accessToken;
    var messageId=e.gmail.messageId;
  }