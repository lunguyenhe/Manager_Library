const db = require("../models");
const Book =db.BOOKS;
const Op=db.Sequelize.Op
const { bookSchema } = require('../validators/book.validator');
exports.create =(req,res) =>{
    const { error, value } = bookSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const book={
        title: req.body.title,
        author_id:req.body.author_id,
        publishingyear:req.body.publishingyear,
        price:req.body.price,
        genres_id:req.body.genres_id,


    }
    Book.create(book).then(data=>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            messsage:
            err.messsage||"Some error occurred while creating the book."

        });
    });
}
exports.findAll =(req,res)=>{
    const title =req.query.title;
    var condition =title ? {title:{[Op.like]:`%${title}%`}}:null;
    Book.findAll({where: condition})
    .then(data=>{
        res.send(data);
    })
}
exports.findOne = (req, res) => {
    const id = req.params.id;
    Book.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Book with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Book with id=" + id
        });
      });
  };
  
  
  exports.update = (req, res) => {
    const { error, value } = bookSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    
  const book=  Book.findByPk(req.body.book_id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Book with id=${id}.`
          });
        }
      })
    const bookupdate = {
        book_id:req.body.book_id,
        title: req.body.title ? req.body.title: book.title ,
        author_id:req.body.author_id ? req.body.author_id: book.author_id,
        publishingyear:req.body.publishingyear ? req.body.publishingyear: book.publishingyear,
        price:req.body.price ? req.body.price:book.price,
        genres_id:req.body.genres_id ? req.body.genres_id:book.genres_id,
    };
    console.log(bookupdate);
    Book.update(bookupdate, {
      where: { book_id: bookupdate.book_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Book was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Book with id=${id}. Maybe Author was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Book with id=" + id
        });
      });
  };
   
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Book.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Book was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Book with id=${id}. Maybe Author was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Book with id=" + id
        });
      });
  };
  