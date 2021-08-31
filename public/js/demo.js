
// // $(function() {
// //   'use strict';

// //   // Initialize the jQuery File Upload widget:
// //   $('#fileupload').fileupload({
// //     // Uncomment the following to send cross-domain cookies:
// //     //xhrFields: {withCredentials: true},
// //     url: ''
// //   });

//   // Enable iframe cross-domain access via redirect option:
//   // $('#fileupload').fileupload(
//   //   'option',
//   //   'redirect',
//   //   window.location.href.replace(/\/[^/]*$/, '/cors/result.html?%s')
//   // );

//   if (window.location.hostname === 'blueimp.github.io') {
//     // // Demo settings:
//     // $('#fileupload').fileupload('option', {
//     //   url: '',
//     //   // Enable image resizing, except for Android and Opera,
//     //   // which actually support image resizing, but fail to
//     //   // send Blob objects via XHR requests:
//     //   disableImageResize: /Android(?!.*Chrome)|Opera/.test(
//     //     window.navigator.userAgent
//     //   ),
//     //   maxFileSize: 99900000,
//     //   acceptFileTypes: /(\.|\/)(gif|jpe?g|png|pdf)$/i
//     // });
//     // // Upload server status check for browsers with CORS support:
//     // if ($.support.cors) {
//     //   $.ajax({
//     //     url: '//jquery-file-upload.appspot.com/',
//     //     type: 'HEAD'
//     //   }).fail(function() {
//     //     $('<div class="alert alert-danger"/>')
//     //       .text('Upload server currently unavailable - ' + new Date())
//     //       .appendTo('#fileupload');
//     //   });
//     // }
//   } else {
//     // Load existing files:
//     // $('#fileupload').addClass('fileupload-processing');
//     // $.ajax({
//     //   // Uncomment the following to send cross-domain cookies:
//     //   xhrFields: {withCredentials: true},
//     //   url: $('#fileupload').fileupload('option', 'url'),
//     //   dataType: 'json',
//     //   context: $('#fileupload')[0]
//     // })
//     //   .always(function() {
//     //     $(this).removeClass('fileupload-processing');
//     //   })
//     //   .done(function(result) {
//     //     $(this)
//     //       .fileupload('option', 'done')
//     //       // eslint-disable-next-line new-cap
//     //       .call(this, $.Event('done'), { result: result });
//     //   });
//   }
// });
// $(document).ready(function() { 
//   var router = new AppRouter();

//   $('#fileupload').fileupload({
//       url: '',
      
//       //acceptFileTypes: /(\.|\/)(tar|tgz|tar.gz)$/i,
//       //maxFileSize: 20000000,  // 20 MB
  
//       add: function (e, data) {
//           var acceptFileTypes = /^application\/(tar|tgz|tar.gz|gzip|x-tar|pdf|jpg|jpeg)$/i;
//           alert(data.files[0]['type']); // Pour vérifier la syntaxe de l'extension
//           //alert(data.files[0]['size']); Pour vérifier la taille du fichier
//           if(data.files[0]['type'].length && !acceptFileTypes.test(data.files[0]['type'])) { //si le type ne correspond pas à ceux définits dans acceptFileTypes
//           $('#info').append('<font color=red><b>Mauvaise extension</b></font><br/><br/>Extensions valides : <b>(tar|tgz|tar.gz)</b>');
  
//           }
//           else if(data.files[0]['size'] > 20000000) { //si la taille du fichier dépasse 20 MB
//           $('#info').append('<font color=red><b>La taille du fichier doit etre inférieure à 20 MO</b></font>');   
  
//           }
//           else {
//             data.preventDefault();
//           var jqXHR = data.submit(); //upload le fichier direct après qu'on l'ai choisi
//           }
//       },
//       progress: function(e, data){
//           var progress = parseInt(data.loaded / data.total * 100, 10); // calcule l'avancement de l'upload et l'affiche dans la bar progress
//           $('#progress .progress-bar').css(
//           'width',
//           progress + '%'
//           );
//           if (progress == 100) {
//           $('#info').append('<font color=green><b>Fichier uploadé !</b></font>');
//           }
//       }
  
//   });
//   $('#fileupload').fileupload(
//         'option',
//         'redirect',
//         window.location.href.replace(/\/[^/]*$/, '/cors/result.html?%s')
//       );
  
//   });
$(function() {

'use strict';
 
// Initialize the jQuery File Upload widget:
$('#fileupload').fileupload({
    // Uncomment the following to send cross-domain cookies:
    //xhrFields: {withCredentials: true},
    url: 'https://upload-gdrive.herokuapp.com/projects'
    //console.log('ggggg')
});

// Enable iframe cross-domain access via redirect option:
$('#fileupload').fileupload(
    'option',
    'redirect',
    window.location.href.replace(
        /\/[^\/]*$/,
        '/cors/result.html?%s'
    )
);

if (window.location.hostname === 'https://upload-gdrive.herokuapp.com') {
    // $('#fileupload').fileupload('option', {
    //     url: 'http://localhost:5000/projects',
    //     // Enable image resizing, except for Android and Opera,
    //     // which actually support image resizing, but fail to
    //     // send Blob objects via XHR requests:
    //     disableImageResize: /Android(?!.*Chrome)|Opera/
    //         .test(window.navigator.userAgent),
    //     //maxFileSize: 999000,
    //     acceptFileTypes: /(\.|\/)(gif|jpe?g|png|pdf)$/i
    // });
    // Upload server status check for browsers with CORS support:
    if ($.support.cors) {
        // console.log(window.location.hostname);
        // $.ajax({
        //     url: 'https://upload-gdrive.herokuapp.com/projects',
        //     type: 'POST'
        // }).fail(function () {
        //     $('<div class="alert alert-danger"/>')
        //         .text('Upload server currently unavailable - ' +
        //                 new Date())
        //         .appendTo('#fileupload');
        // });
    }
} else {
    // Load existing files:
    console.log(window.location.hostname);
    $('#fileupload').addClass('fileupload-processing');
    $.ajax({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: $('#fileupload').fileupload('option', 'url'),
        dataType: 'json',
        context: $('#fileupload')[0]
    }).always(function () {
        $(this).removeClass('fileupload-processing');
    }).done(function (result) {
        $(this).fileupload('option', 'done')
            .call(this, $.Event('done'), {result: result});
    });
}

});
