module.exports = ( boardMembers, filteredActivity, cardsOfBoard, boardDescription, listsOfBoard, boardTitle, boardDeadline ) => {

   // get board's members
   const labelOfMembers = boardMembers.map(({ label }) => label)
   const nameOfMembers = boardMembers.map(({ name }) => name)


   // formate date
   const deadLineOfBoard = new Date(boardDeadline).toLocaleDateString("ru-RU").split("/")

   const activityDate = filteredActivity?.map(({ date }) => {
      return new Date(date).toLocaleDateString("ru-RU").split("/")
   })


   // lists of board
   const listTitle = listsOfBoard?.map(({title}) => {
      return title
   })


   //get info from cards
   const cardTitle = cardsOfBoard?.map(({title}) => {
      return title
   })


   const cardDeadline = cardsOfBoard?.map(({selectedDate}) => {
      return new Date(selectedDate).toLocaleDateString("ru-RU").split("/")
   })

   const cardLabel = cardsOfBoard?.map(({label}) => {
      return label
   })


   const cardMembers = cardsOfBoard?.map(({members}) => {
      return members
   })

   const cardMemberLabel= cardMembers.flat().map(({label}) => {
      return label
   })

   const cardMemberName = cardMembers.flat().map(({name}) => {
      return name
   })



   // if no data in item
   const showDescription = boardDescription ? boardDescription : "no description"



   // get text from activity
   const activityText = filteredActivity?.map(({ text }) => {
      return text
   })


   return `
   <!doctype html>
   <html>
      <head>
         <meta charset="utf-8">
         <title>PDF Result Template</title>
         <style>
            .invoice-box {
               max-width: 800px;
               margin: auto;
               padding: 30px;
               border: 1px solid #eee;
               box-shadow: 0 0 10px rgba(0, 0, 0, .15);
               font-size: 16px;
               line-height: 24px;
               font-family: 'Helvetica Neue', 'Helvetica',
            }
            .members-container {
               padding: 1rem:
               display: flex;
               flex-direction: wrap;
            }
         </style>
      </head>
      <body>
         <div class="invoice-box">
            <h3> Board title: ${boardTitle}</h3>
            <h3> Board description: ${showDescription}</h3>
            <h3> Board deadline: ${deadLineOfBoard}</h3>
            <h3> Description: ${showDescription}</h3>
            <div>
               <h3> Board lists: </h3>
               <div class="members-container">
                  <p>${listTitle[0]  ? listTitle[0]  : " " }</p>
                  <p>${listTitle[1]  ? listTitle[1]  : " " }</p>
                  <p>${listTitle[2]  ? listTitle[2]  : " " }</p>
                  <p>${listTitle[3]  ? listTitle[3]  : " " }</p>
                  <p>${listTitle[4]  ? listTitle[4]  : " " }</p>
                  <p>${listTitle[5]  ? listTitle[5]  : " " }</p>
                  <p>${listTitle[6]  ? listTitle[6]  : " " }</p>
                  <p>${listTitle[7]  ? listTitle[7]  : " " }</p>
                  <p>${listTitle[8]  ? listTitle[8]  : " " }</p>
                  <p>${listTitle[9]  ? listTitle[9]  : " " }</p>
                  <p>${listTitle[10] ? listTitle[10] : " " }</p>
                  <p>${listTitle[11] ? listTitle[11] : " " }</p>
                  <p>${listTitle[12] ? listTitle[12] : " " }</p>
                  <p>${listTitle[13] ? listTitle[12] : " " }</p>
                  <p>${listTitle[14] ? listTitle[14] : " " }</p>
               </div>
             </div>
            <div>
               <h3> Board members: </h3>
               <div class="members-container">
                  <p>${nameOfMembers[0]  ? nameOfMembers[0]  : " " }  ${labelOfMembers[0]  ? labelOfMembers[0]  : " " }</p>
                  <p>${nameOfMembers[1]  ? nameOfMembers[1]  : " " }  ${labelOfMembers[1]  ? labelOfMembers[1]  : " " }</p>
                  <p>${nameOfMembers[2]  ? nameOfMembers[2]  : " " }  ${labelOfMembers[2]  ? labelOfMembers[2]  : " " }</p>
                  <p>${nameOfMembers[3]  ? nameOfMembers[3]  : " " }  ${labelOfMembers[3]  ? labelOfMembers[3]  : " " }</p>
                  <p>${nameOfMembers[4]  ? nameOfMembers[4]  : " " }  ${labelOfMembers[4]  ? labelOfMembers[4]  : " " }</p>
                  <p>${nameOfMembers[5]  ? nameOfMembers[5]  : " " }  ${labelOfMembers[5]  ? labelOfMembers[5]  : " " }</p>
                  <p>${nameOfMembers[6]  ? nameOfMembers[6]  : " " }  ${labelOfMembers[6]  ? labelOfMembers[6]  : " " }</p>
                  <p>${nameOfMembers[7]  ? nameOfMembers[7]  : " " }  ${labelOfMembers[7]  ? labelOfMembers[7]  : " " }</p>
                  <p>${nameOfMembers[8]  ? nameOfMembers[8]  : " " }  ${labelOfMembers[8]  ? labelOfMembers[8]  : " " }</p>
                  <p>${nameOfMembers[9]  ? nameOfMembers[9]  : " " }  ${labelOfMembers[9]  ? labelOfMembers[9]  : " " }</p>
                  <p>${nameOfMembers[10] ? nameOfMembers[10] : " " }  ${labelOfMembers[10] ? labelOfMembers[10] : " " }</p>
                  <p>${nameOfMembers[11] ? nameOfMembers[11] : " " }  ${labelOfMembers[11] ? labelOfMembers[11] : " " }</p>
                  <p>${nameOfMembers[12] ? nameOfMembers[12] : " " }  ${labelOfMembers[12] ? labelOfMembers[12] : " " }</p>
                  <p>${nameOfMembers[13] ? nameOfMembers[13] : " " }  ${labelOfMembers[13] ? labelOfMembers[13] : " " }</p>
                  <p>${nameOfMembers[14] ? nameOfMembers[14] : " " }  ${labelOfMembers[14] ? labelOfMembers[14] : " " }</p>
               </div>
             </div>
             <div>
             <h3> Cards: </h3>
             <div class="members-container">
               <div>
                  <h4> Card's members </h4>
                  <p>${cardMemberLabel[0]   ? cardMemberLabel[0]  : " " }  ${cardMemberName[0]   ? cardMemberName[0]  : " " } </p>
                  <p>${cardMemberLabel[1]   ? cardMemberLabel[1]  : " " }  ${cardMemberName[1]   ? cardMemberName[1]  : " " } </p>
                  <p>${cardMemberLabel[2]   ? cardMemberLabel[2]  : " " }  ${cardMemberName[2]   ? cardMemberName[2]  : " " } </p>
                  <p>${cardMemberLabel[3]   ? cardMemberLabel[3]  : " " }  ${cardMemberName[3]   ? cardMemberName[3]  : " " } </p>
                  <p>${cardMemberLabel[4]   ? cardMemberLabel[4]  : " " }  ${cardMemberName[4]   ? cardMemberName[4]  : " " } </p>
                  <p>${cardMemberLabel[5]   ? cardMemberLabel[5]  : " " }  ${cardMemberName[5]   ? cardMemberName[5]  : " " } </p>
                  <p>${cardMemberLabel[6]   ? cardMemberLabel[6]  : " " }  ${cardMemberName[6]   ? cardMemberName[6]  : " " } </p>
                  <p>${cardMemberLabel[7]   ? cardMemberLabel[7]  : " " }  ${cardMemberName[7]   ? cardMemberName[7]  : " " } </p>
                  <p>${cardMemberLabel[8]   ? cardMemberLabel[8]  : " " }  ${cardMemberName[8]   ? cardMemberName[8]  : " " } </p>
                  <p>${cardMemberLabel[9]   ? cardMemberLabel[9]  : " " }  ${cardMemberName[9]   ? cardMemberName[9]  : " " } </p>
                  <p>${cardMemberLabel[10]  ? cardMemberLabel[10] : " " }  ${cardMemberName[10]  ? cardMemberName[10] : " " } </p>
                  <p>${cardMemberLabel[11]  ? cardMemberLabel[11] : " " }  ${cardMemberName[11]  ? cardMemberName[11] : " " } </p>
                  <p>${cardMemberLabel[12]  ? cardMemberLabel[12] : " " }  ${cardMemberName[12]  ? cardMemberName[12] : " " } </p>
                  <p>${cardMemberLabel[13]  ? cardMemberLabel[13] : " " }  ${cardMemberName[13]  ? cardMemberName[13] : " " } </p>
                  <p>${cardMemberLabel[14]  ? cardMemberLabel[14] : " " }  ${cardMemberName[14]  ? cardMemberName[14] : " " } </p>
               </div>

               <h4> Card's title, deadline, level</h4>
                <p>${cardTitle[0]   ?   cardTitle[0]  : " " }      ${cardDeadline[0]   ? cardDeadline[0]  : " " }    ${cardLabel[0]   ? cardLabel[0]  : " " } </p>
                <p>${cardTitle[1]   ?   cardTitle[1]  : " " }      ${cardDeadline[1]   ? cardDeadline[1]  : " " }    ${cardLabel[1]   ? cardLabel[1]  : " " } </p>
                <p>${cardTitle[2]   ?   cardTitle[2]  : " " }      ${cardDeadline[2]   ? cardDeadline[2]  : " " }    ${cardLabel[2]   ? cardLabel[2]  : " " } </p>
                <p>${cardTitle[3]   ?   cardTitle[3]  : " " }      ${cardDeadline[3]   ? cardDeadline[3]  : " " }    ${cardLabel[3]   ? cardLabel[3]  : " " } </p>
                <p>${cardTitle[4]   ?   cardTitle[4]  : " " }      ${cardDeadline[4]   ? cardDeadline[4]  : " " }    ${cardLabel[4]   ? cardLabel[4]  : " " } </p>
                <p>${cardTitle[5]   ?   cardTitle[5]  : " " }      ${cardDeadline[5]   ? cardDeadline[5]  : " " }    ${cardLabel[5]   ? cardLabel[5]  : " " } </p>
                <p>${cardTitle[6]   ?   cardTitle[6]  : " " }      ${cardDeadline[6]   ? cardDeadline[6]  : " " }    ${cardLabel[6]   ? cardLabel[6]  : " " } </p>
                <p>${cardTitle[7]   ?   cardTitle[7]  : " " }      ${cardDeadline[7]   ? cardDeadline[7]  : " " }    ${cardLabel[7]   ? cardLabel[7]  : " " } </p>
                <p>${cardTitle[8]   ?   cardTitle[8]  : " " }      ${cardDeadline[8]   ? cardDeadline[8]  : " " }    ${cardLabel[8]   ? cardLabel[8]  : " " } </p>
                <p>${cardTitle[9]   ?   cardTitle[9]  : " " }      ${cardDeadline[9]   ? cardDeadline[9]  : " " }    ${cardLabel[9]   ? cardLabel[9]  : " " } </p>
                <p>${cardTitle[10]   ?   cardTitle[10]  : " " }    ${cardDeadline[10]   ? cardDeadline[10]  : " " }    ${cardLabel[10]   ? cardLabel[10]  : " " } </p>
                <p>${cardTitle[11]   ?   cardTitle[11]  : " " }    ${cardDeadline[11]   ? cardDeadline[11]  : " " }    ${cardLabel[11]   ? cardLabel[11]  : " " } </p>
                <p>${cardTitle[12]   ?   cardTitle[12]  : " " }    ${cardDeadline[12]   ? cardDeadline[12]  : " " }    ${cardLabel[12]   ? cardLabel[12]  : " " } </p>
                <p>${cardTitle[13]   ?   cardTitle[13]  : " " }    ${cardDeadline[13]   ? cardDeadline[13]  : " " }    ${cardLabel[13]   ? cardLabel[13]  : " " } </p>
                <p>${cardTitle[14]   ?   cardTitle[14]  : " " }    ${cardDeadline[14]   ? cardDeadline[14]  : " " }    ${cardLabel[14]   ? cardLabel[14]  : " " } </p>
                <p>${cardTitle[15]   ?   cardTitle[15]  : " " }    ${cardDeadline[15]   ? cardDeadline[15]  : " " }    ${cardLabel[15]   ? cardLabel[15]  : " " } </p>
                <p>${cardTitle[16]   ?   cardTitle[16]  : " " }    ${cardDeadline[16]   ? cardDeadline[16]  : " " }    ${cardLabel[16]   ? cardLabel[16]  : " " } </p>
                <p>${cardTitle[17]   ?   cardTitle[17]  : " " }    ${cardDeadline[17]   ? cardDeadline[17]  : " " }    ${cardLabel[17]   ? cardLabel[17]  : " " } </p>
                <p>${cardTitle[18]   ?   cardTitle[18]  : " " }    ${cardDeadline[18]   ? cardDeadline[18]  : " " }    ${cardLabel[18]   ? cardLabel[18]  : " " } </p>
                <p>${cardTitle[19]   ?   cardTitle[19]  : " " }    ${cardDeadline[19]   ? cardDeadline[19]  : " " }    ${cardLabel[19]   ? cardLabel[19]  : " " } </p>
                <p>${cardTitle[20]   ?   cardTitle[20]  : " " }    ${cardDeadline[20]   ? cardDeadline[20]  : " " }    ${cardLabel[20]   ? cardLabel[20]  : " " } </p>
                <p>${cardTitle[21]   ?   cardTitle[21]  : " " }    ${cardDeadline[21]   ? cardDeadline[21]  : " " }    ${cardLabel[21]   ? cardLabel[21]  : " " } </p>
                <p>${cardTitle[22]   ?   cardTitle[22]  : " " }    ${cardDeadline[22]   ? cardDeadline[22]  : " " }    ${cardLabel[22]   ? cardLabel[22]  : " " } </p>
                <p>${cardTitle[23]   ?   cardTitle[23]  : " " }    ${cardDeadline[23]   ? cardDeadline[23]  : " " }    ${cardLabel[23]   ? cardLabel[23]  : " " } </p>
                <p>${cardTitle[24]   ?   cardTitle[24]  : " " }    ${cardDeadline[24]   ? cardDeadline[24]  : " " }    ${cardLabel[24]   ? cardLabel[24]  : " " } </p>
                <p>${cardTitle[25]   ?   cardTitle[25]  : " " }    ${cardDeadline[25]   ? cardDeadline[25]  : " " }    ${cardLabel[25]   ? cardLabel[25]  : " " } </p>
                <p>${cardTitle[26]   ?   cardTitle[26]  : " " }    ${cardDeadline[26]   ? cardDeadline[26]  : " " }    ${cardLabel[26]   ? cardLabel[26]  : " " } </p>
                <p>${cardTitle[27]   ?   cardTitle[27]  : " " }    ${cardDeadline[27]   ? cardDeadline[27]  : " " }    ${cardLabel[27]   ? cardLabel[27]  : " " } </p>
                <p>${cardTitle[28]   ?   cardTitle[28]  : " " }    ${cardDeadline[28]   ? cardDeadline[28]  : " " }    ${cardLabel[28]   ? cardLabel[28]  : " " } </p>
                <p>${cardTitle[29]   ?   cardTitle[29]  : " " }    ${cardDeadline[29]   ? cardDeadline[29]  : " " }    ${cardLabel[29]   ? cardLabel[29]  : " " } </p>
             </div>
           </div>
            <div>
               <h3> Activity:</h3>
               <p>${activityText[0]  ?  activityText[0]  : " " }   ${activityDate[0]  ?  activityDate[0]  : " " }</p>
               <p>${activityText[1]  ?  activityText[1]  : " " }   ${activityDate[1]  ?  activityDate[1]  : " " }</p>
               <p>${activityText[2]  ?  activityText[2]  : " " }   ${activityDate[2]  ?  activityDate[2]  : " " }</p>
               <p>${activityText[3]  ?  activityText[3]  : " " }   ${activityDate[3]  ?  activityDate[3]  : " " }</p>
               <p>${activityText[4]  ?  activityText[4]  : " " }   ${activityDate[4]  ?  activityDate[4]  : " " }</p>
               <p>${activityText[5]  ?  activityText[5]  : " " }   ${activityDate[5]  ?  activityDate[5]  : " " }</p>
               <p>${activityText[6]  ?  activityText[6]  : " " }   ${activityDate[6]  ?  activityDate[6]  : " " }</p>
               <p>${activityText[7]  ?  activityText[7]  : " " }   ${activityDate[7]  ?  activityDate[7]  : " " }</p>
               <p>${activityText[8]  ?  activityText[8]  : " " }   ${activityDate[8]  ?  activityDate[8]  : " " }</p>
               <p>${activityText[9]  ?  activityText[9]  : " " }   ${activityDate[9]  ?  activityDate[9]  : " " }</p>
               <p>${activityText[10] ?  activityText[10] : " " }   ${activityDate[10] ?  activityDate[10] : " " }</p>
               <p>${activityText[11] ?  activityText[11] : " " }   ${activityDate[11] ?  activityDate[11] : " " }</p>
               <p>${activityText[12] ?  activityText[12] : " " }   ${activityDate[12] ?  activityDate[12] : " " }</p>
               <p>${activityText[13] ?  activityText[13] : " " }   ${activityDate[13] ?  activityDate[13] : " " }</p>
               <p>${activityText[14] ?  activityText[14] : " " }   ${activityDate[14] ?  activityDate[14] : " " }</p>
               <p>${activityText[15] ?  activityText[15] : " " }   ${activityDate[15] ?  activityDate[15] : " " }</p>
               <p>${activityText[16] ?  activityText[16] : " " }   ${activityDate[16] ?  activityDate[16] : " " }</p>
               <p>${activityText[17] ?  activityText[17] : " " }   ${activityDate[17] ?  activityDate[17] : " " }</p>
               <p>${activityText[18] ?  activityText[18] : " " }   ${activityDate[18] ?  activityDate[18] : " " }</p>
               <p>${activityText[19] ?  activityText[19] : " " }   ${activityDate[19] ?  activityDate[19] : " " }</p>
               <p>${activityText[20] ?  activityText[20] : " " }   ${activityDate[20] ?  activityDate[20] : " " }</p>
               <p>${activityText[21] ?  activityText[21] : " " }   ${activityDate[21] ?  activityDate[21] : " " }</p>
               <p>${activityText[22] ?  activityText[22] : " " }   ${activityDate[22] ?  activityDate[22] : " " }</p>
               <p>${activityText[23] ?  activityText[23] : " " }   ${activityDate[23] ?  activityDate[23] : " " }</p>
               <p>${activityText[24] ?  activityText[24] : " " }   ${activityDate[25] ?  activityDate[25] : " " }</p>
               <p>${activityText[25] ?  activityText[25] : " " }   ${activityDate[25] ?  activityDate[25] : " " }</p>
               <p>${activityText[26] ?  activityText[26] : " " }   ${activityDate[26] ?  activityDate[26] : " " }</p>
               <p>${activityText[27] ?  activityText[27] : " " }   ${activityDate[27] ?  activityDate[27] : " " }</p>
               <p>${activityText[28] ?  activityText[28] : " " }   ${activityDate[28] ?  activityDate[28] : " " }</p>
               <p>${activityText[29] ?  activityText[29] : " " }   ${activityDate[29] ?  activityDate[29] : " " }</p>
               <p>${activityText[30] ?  activityText[30] : " " }   ${activityDate[30] ?  activityDate[30] : " " }</p>
               <p>${activityText[31] ?  activityText[31] : " " }   ${activityDate[31] ?  activityDate[31] : " " }</p>
               <p>${activityText[32] ?  activityText[32] : " " }   ${activityDate[32] ?  activityDate[32] : " " }</p>
               <p>${activityText[33] ?  activityText[33] : " " }   ${activityDate[33] ?  activityDate[33] : " " }</p>
               <p>${activityText[34] ?  activityText[34] : " " }   ${activityDate[34] ?  activityDate[34] : " " }</p>
               <p>${activityText[35] ?  activityText[35] : " " }   ${activityDate[35] ?  activityDate[35] : " " }</p>
               <p>${activityText[36] ?  activityText[36] : " " }   ${activityDate[36] ?  activityDate[36] : " " }</p>
               <p>${activityText[37] ?  activityText[37] : " " }   ${activityDate[37] ?  activityDate[37] : " " }</p>
               <p>${activityText[38] ?  activityText[38] : " " }   ${activityDate[38] ?  activityDate[38] : " " }</p>
               <p>${activityText[39] ?  activityText[39] : " " }   ${activityDate[39] ?  activityDate[39] : " " }</p>
               <p>${activityText[40] ?  activityText[40] : " " }   ${activityDate[40] ?  activityDate[40] : " " }</p>
               <p>${activityText[41] ?  activityText[41] : " " }   ${activityDate[41] ?  activityDate[41] : " " }</p>
               <p>${activityText[42] ?  activityText[42] : " " }   ${activityDate[42] ?  activityDate[42] : " " }</p>
               <p>${activityText[43] ?  activityText[43] : " " }   ${activityDate[43] ?  activityDate[43] : " " }</p>
               <p>${activityText[44] ?  activityText[44] : " " }   ${activityDate[44] ?  activityDate[44] : " " }</p>
               <p>${activityText[45] ?  activityText[45] : " " }   ${activityDate[45] ?  activityDate[45] : " " }</p>
               <p>${activityText[46] ?  activityText[46] : " " }   ${activityDate[46] ?  activityDate[46] : " " }</p>
               <p>${activityText[47] ?  activityText[47] : " " }   ${activityDate[47] ?  activityDate[47] : " " }</p>
               <p>${activityText[48] ?  activityText[48] : " " }   ${activityDate[48] ?  activityDate[48] : " " }</p>
               <p>${activityText[49] ?  activityText[49] : " " }   ${activityDate[49] ?  activityDate[49] : " " }</p>
               <p>${activityText[50] ?  activityText[50] : " " }   ${activityDate[50] ?  activityDate[50] : " " }</p>
            </div>
         </div>
      </body>
   </html>
   `;
};