'use strict';

(function () {
   var addButton = document.querySelector('#yourpend');
   var deleteButton = document.querySelector('#theirpend');
   var adhdbutton = document.querySelector('#addbook');
   var seeboook = document.querySelector('#seebook');
   var clickNbr = document.querySelector('#click-nbr');
   var namesection = document.querySelector('#display-name');
   var pollsection = document.querySelector('#newpoll');
   var apiUrl = 'https://books-naiyucko.c9users.io/api/clicks';
   var apiUrlPolls = 'https://books-naiyucko.c9users.io/api/polls';
   var apiUrlGoogle = 'https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyDGro4GBGWx8sbhp87ZJh1ZfO27VmGLTqE';
   
   function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   }
   
   function ahuehue () {
      ajaxRequest('GET', 'https://books-naiyucko.c9users.io/api/books', function(data) {
         var apidata = JSON.parse(data);
         var htmls = "";
         var chunky = chunk(apidata, 6);
         for (var v = 0; v < chunky.length; v++)
          {
            htmls = htmls.concat("<div class=\"row\">");
            for (var h = 0; h < chunky[v].length; h++)
              {
                htmls = htmls.concat("<div class=\"col-md-2 text-left\" id=\"placeholder\"><div class=\"wowthere\">");
                //actual data
                htmls = htmls.concat("<img src=\"" + chunky[v][h].image +"\" alt=\"" + chunky[v][h].title + "\" style=\"width:128px;height:148px;\" class=\"img-rounded\">");
                //end actual data
                htmls = htmls.concat("</div></div>");
              }
            htmls = htmls.concat("</div>");
          }
        $("#newpoll").html(htmls);
        ajaxRequest('GET', 'https://books-naiyucko.c9users.io/api/tradesi', function(data2) {
           var daata2 = JSON.parse(data2);
           $("#yourpend").html('Your Trades: ' + daata2.length);
           ajaxRequest('GET', 'https://books-naiyucko.c9users.io/api/tradesm', function(data3) {
              var daata3 = JSON.parse(data3);
               $("#theirpend").html('Trades for You: ' + daata3.length);
           });
        });
      });
   }
   
   function chunk(arr, size) {
  var total = [];
  var amount = Math.ceil(arr.length / size);
  for (var v = 0; v < amount; v++)
    {
      var temparr = [];
      var ind = 0;
      for (var h = 0 + (size * v); h < (size + (size * v)) && h < arr.length; h++)
        {
          temparr[ind] = arr[h];
          ind++;
        }
      total.push(temparr);
    }
  return total;
}
   
   function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
   
    function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      namesection.innerHTML = clicksObject.username;
      ahuehue();
   }
   
   
   
   addButton.addEventListener('click', function () {
      $('#bookh').html('Your Trades:');
       ajaxRequest('GET', 'https://books-naiyucko.c9users.io/api/tradesi', function(data) {
         var apidata = JSON.parse(data);
         var htmls = "";
         var chunky = chunk(apidata, 6);
         for (var v = 0; v < chunky.length; v++)
          {
            htmls = htmls.concat("<div class=\"row\">");
            for (var h = 0; h < chunky[v].length; h++)
              {
                htmls = htmls.concat("<div class=\"col-md-2 text-left\" id=\"placeholder\"><div class=\"wowthere\">");
                   var buttont = '<button class=\"btn btn-danger btn-xs\"id=\"testingtime\" onclick="cancelTradeStuff(\'' + chunky[v][h].title + '\')">Cancel</button>';
                
                //actual data
                htmls = htmls.concat("<img src=\"" + chunky[v][h].image +"\" alt=\"" + chunky[v][h].title + "\" style=\"width:128px;height:148px;\" class=\"img-rounded\">" + buttont);
                //end actual data
                htmls = htmls.concat("</div></div>");
              }
            htmls = htmls.concat("</div>");
          }
        $("#newpoll").html(htmls);
      });

   }, false);
   
   seeboook.addEventListener('click', function() {
      $('#bookh').html('All Books:');
       ajaxRequest('GET', 'https://books-naiyucko.c9users.io/api/allbooks', function(data) {
         var apidata = JSON.parse(data);
         var htmls = "";
         var chunky = chunk(apidata, 6);
         for (var v = 0; v < chunky.length; v++)
          {
            htmls = htmls.concat("<div class=\"row\">");
            for (var h = 0; h < chunky[v].length; h++)
              {
                htmls = htmls.concat("<div class=\"col-md-2 text-left\" id=\"placeholder\"><div class=\"wowthere\">");
                if (chunky[v][h].user == namesection.innerHTML || chunky[v][h].trade != '') {
                   var buttont = '<button class=\"btn btn-info btn-xs disabled\"id=\"testingtime\">Trade</button>';
                }
                else {
                   var buttont = '<button class=\"btn btn-info btn-xs\"id=\"testingtime\" onclick="tradeStuff(\'' + chunky[v][h].title + '\')">Trade</button>';
                }
                //actual data
                htmls = htmls.concat("<img src=\"" + chunky[v][h].image +"\" alt=\"" + chunky[v][h].title + "\" style=\"width:128px;height:148px;\" class=\"img-rounded\">" + buttont);
                //end actual data
                htmls = htmls.concat("</div></div>");
              }
            htmls = htmls.concat("</div>");
          }
        $("#newpoll").html(htmls);
      });
   }, false);
   
   
   
   adhdbutton.addEventListener('click', function() {
      pollsection.innerHTML = '<p>Book Title: <input type="text" name="title" id="title" /><p class="submit"><button id="ayylmao">Save</button></p>';
      $('#ayylmao').click(function() {
         ajaxRequest('GET', 'https://www.googleapis.com/books/v1/volumes?q=' + $('#title').val() + '&key=AIzaSyDGro4GBGWx8sbhp87ZJh1ZfO27VmGLTqE', function(data) {
            var everythingg = JSON.parse(data);
            if (everythingg.totalItems !== 0) {
               $.post( "https://books-naiyucko.c9users.io/newpoll", { 'title': everythingg.items[0].volumeInfo.title, 'image': everythingg.items[0].volumeInfo.imageLinks.thumbnail }, function( data ) {
                 ahuehue();
               });
            }
            else {
               pollsection.innerHTML = '<span color="red">Invalid Title</span>';
            }
         });
      });
   }, false);
   
   deleteButton.addEventListener('click', function () {
      $('#bookh').html('Trades for You:');
       ajaxRequest('GET', 'https://books-naiyucko.c9users.io/api/tradesm', function(data) {
         var apidata = JSON.parse(data);
         var htmls = "";
         var chunky = chunk(apidata, 6);
         for (var v = 0; v < chunky.length; v++)
          {
            htmls = htmls.concat("<div class=\"row\">");
            for (var h = 0; h < chunky[v].length; h++)
              {
                htmls = htmls.concat("<div class=\"col-md-2 text-left\" id=\"placeholder\"><div class=\"wowthere\">");
                   var buttont = '<button class=\"btn btn-xs\"id=\"testingtime\" onclick="approveTradeStuff(\'' + chunky[v][h].title + '\')">Approve</button>';
                
                //actual data
                htmls = htmls.concat("<img src=\"" + chunky[v][h].image +"\" alt=\"" + chunky[v][h].title + "\" style=\"width:128px;height:148px;\" class=\"img-rounded\">" + buttont);
                //end actual data
                htmls = htmls.concat("</div></div>");
              }
            htmls = htmls.concat("</div>");
          }
        $("#newpoll").html(htmls);
      });

   }, false);
   
   ready(ajaxRequest('GET', apiUrl, updateClickCount));
})();

function tradeStuff(idnum) {
      $.post( "https://books-naiyucko.c9users.io/trade", { 'stuff': idnum }, function( data ) {
                  $('#newpoll').html('Your trade request has been sent');
               });
      
   }
function approveTradeStuff(value) {
   $('#newpoll').html('Your approval has been sent');
}

function cancelTradeStuff(value) {
   $.post( "https://books-naiyucko.c9users.io/canceltrade", { 'stuff': value }, function( data ) {
                  $('#newpoll').html('Your trade request has been cancelled');
               });
}