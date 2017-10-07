'use strict';

var mongoose = require('mongoose'),
    Document = mongoose.model('Document');

exports.list_all_documents = function (req, res) {
    Document.find({}, function (err, document) { //Det her finder ALLE documenter ikke? Vi vil kun have dem for den component man er i
        if (err)
            res.send(err);
        res.json(document);
    });
};




exports.create_document = function (req, res) {
    var new_document = new Document(req.body);
    new_document.save(function (err, document) {
        res.send(err);
        res.json(document);
    });
};


exports.get_document = function (req, res) {
    Document.findById(req.params.documentId, function (err, document) {
        if (err)
            res.send(err);
        res.json(document);
    });
};


exports.update_document = function (req, res) {
    Document.findOneAndUpdate({ _id: req.params.documentId }, req.body, { new: true }, function (err, document) {
        if (err)
            res.send(err);
        res.json(document);
    });
};


exports.delete_document = function (req, res) {

    Document.remove({
        _id: req.params.documentId
    }, function (err, document) {
        if (err)
            res.send(err);
        res.json({ message: 'Document successfully deleted' });
    });
};
