'use strict';
angular.module('FileSync')
  .factory('HistoryService', function (SocketIOService, _) {
    var edits = [];
    var nbLike = 0;

    SocketIOService.onFileChanged(function (filename, timestamp, content) {
      edits.unshift({
        filename: filename,
        timestamp: timestamp,
        content: content
      });
    });

    SocketIOService.onButtonLikeClicked(function () {
      nbLike++;
    });

    return {
      edits: edits,
      nbLike: nbLike,
      remove: function (edit) {
        _.remove(edits, edit);
      },
      like: function (edit) {
        _.like(nbLike, edit);
      }
    };
  });
