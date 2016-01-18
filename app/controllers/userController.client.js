'use strict';

(function () {

   var namet = document.querySelector('#fullname').value || null;
   var cityt = document.querySelector('#city') || null;
   var statet = document.querySelector('#state') || null;
   var apiUrl = 'https://books-naiyucko.c9users.io/api/profile';
   //document.getElementById("fullname").value = "Johnny Bravo";
   function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
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
   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }
   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      document.getElementById("fullname").value = clicksObject.fullname;
      document.getElementById("city").value = clicksObject.city;
      document.getElementById("state").value = clicksObject.state;
   }

  ready(ajaxRequest('GET', apiUrl, updateClickCount));
})();
