'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
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
   
   function updateNewPoll () {
      pollsection.innerHTML = '<form id="myForm" method="post" action="newpoll"><p>Poll Title: <input type="text" name="title" id="title" onkeyup=topLel(this.value) /><span id="wowthere"></span></p><br /><div id="input1" style="margin-bottom:4px;" class="clonedInput">Option: <input type="text" name="name1" id="name1" /></div><div><input type="button" id="btnAdd" value="Add Another" /></div><p class="submit"><input type="submit" name="commit" value="Save" id="savebtn"></p></form>';
      $('#btnAdd').click(function() {
          var num        = $('.clonedInput').length;    // how many "duplicatable" input fields we currently have
          var newNum    = new Number(num + 1);        // the numeric ID of the new input field being added
      
          // create the new element via clone(), and manipulate it's ID using newNum value
          var newElem = $('#input' + num).clone().attr('id', 'input' + newNum);
      
          // manipulate the name/id values of the input inside the new element
          newElem.children(':first').attr('id', 'name' + newNum).attr('name', 'name' + newNum);
      
          // insert the new element after the last "duplicatable" input field
          $('#input' + num).after(newElem);
      });
   }
   
   addButton.addEventListener('click', function () {
      updateNewPoll();

   }, false);
   
   seeboook.addEventListener('click', function() {
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
                //actual data
                htmls = htmls.concat("<img src=\"" + chunky[v][h].image +"\" alt=\"" + chunky[v][h].title + "\" style=\"width:128px;height:148px;\" class=\"img-rounded\">");
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
      ajaxRequest('GET', apiUrlPolls, function (data) {
         var html = "";
         var jdata = JSON.parse(data);
         if (jdata.length === 0)
         {
            html += "You haven't created any polls yet!";
         }
         for (var v = 0; v < jdata.length; v++)
         {
            html += '<br /><br /><a class = "menu" href="/poll/' + jdata[v].user + '/' + jdata[v].title + '/view"><b>' + jdata[v].title + '</b></a>' + '<div class="remove-btn"><a href="/poll/' + jdata[v].user + '/' + jdata[v].title + '/delete"><button class="btn btn-remove">Delete</button></div>';
         }
         pollsection.innerHTML = html;
      });

   }, false);
   
   ready(ajaxRequest('GET', apiUrl, updateClickCount));
})();