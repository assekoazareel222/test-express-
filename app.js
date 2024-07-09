const mysql = require('mysql')
const express = require('express')
const app = express()
const myconnection = require('express-myconnection')
const connection = require('express-myconnection')

const optionBd = {
    host: 'localhost',
    user: 'root',
    password: '',
    port : 4000,
    database : 'ecole241'
}
//extraction des donne du formulaire

app.use(express.urlencoded({ extended:false}))

//definintion du middkeware de connection
app.use(myconnection(mysql,optionBd,'pool')) 

app.set("view engine","ejs")
app.set('views','IHM')

app.get('/',  (req, res) => {

req.getConnection((erreur,connection) =>{ 
    if(erreur){
        console.log(erreur)
    }else {
        connection.query('SELECT * FROM apprenants',[], (erreur, resultat)=>{
            if(erreur){console.log(erreur);
        }else{
            res.status(200).render('accueil' , {resultat})
         }
        })
    }
})

}) 


app.post('/apprenants', (req, res) => {

  let nom = req.body.nom;
  
    let prenom = req.body.prenom;
  
    let sexe = req.body.sexe;
  
    let quartier = req.body.quartier;
  
    let referenciel = req.body.referenciel;
  
    let groupe = req.body.groupe;
  
  
    req.getConnection((erreur, connection) => {
  
      if (erreur) {
  
        console.log(erreur);
  
        res.status(500).send({ error: 'Error connecting to database' });
  
      } else {
  
        connection.query('INSERT INTO apprenants (nom, prenom, sexe, quartier, referenciel, groupe) VALUES (?, ?, ?, ?, ?, ?)', [nom, prenom, sexe, quartier, referenciel, groupe], (erreur, resultat) => {
  
          if (erreur) {
  
            console.log(erreur);
  
            res.status(500).send({ error: 'Error inserting into database' });
  
          } else {
  
            res.redirect('/'); // Redirection a la page d'acceuil
  
          }
  
        });
  
      }
  
    });
  
  });

  app.get("/apprenants" , (req , res) => {
    req.getConnection((erreur,connection) =>{ 
        if(erreur){
            console.log(erreur)
        }else {
            connection.query('SELECT * FROM apprenants',[], (erreur, resultat)=>{
                if(erreur){console.log(erreur);
            }else{
                res.status(200).render('apprenants' , {resultat})
             }
            })
        }
    })
  } )


app.use((req,res) => {
    res.status(404).render('erreur')
})
app.listen(3000 ,() => {
    
console.log('application lancer');})  