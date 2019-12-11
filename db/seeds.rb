# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# users = User.create([{ 
#   username: 'ONE',
#   password: '123456',
#   email: 'email@email.com'
# },
#   {username: 'G-Money',
#    password: '234567',
#    email: 'cool@email.com'
#   }])

  

arts = Art.create([{ 
  username: 'Baquiat',
  art_name: 'Basquiat',
  url: "https://i.pinimg.com/736x/21/90/29/2190291f8069fd8ada9aa6bd6d084331.jpg",
  description: "This is a quick mural with Basquiat",
  user_id: 1
  }, 
  { username: 'David Bowe',
    art_name: 'Unknown',
    url: "https://i.pinimg.com/originals/56/b7/a4/56b7a425ef719a132680f832885cd669.jpg",
    description: "An unknown artist with pictures looking up.",
    user_id: 2
  }])



  comments = Comment.create([{ 
    username: 'Basquiat',
    art_name: 'Unknown',
    description: "An unknown artist with pictures looking up.",
   user_id: 1,
   art_id: arts.second
},
  {username: 'David Bowe',
  art_name: 'Unknown',
  description: "An unknown artist with pictures looking up.",
  user_id: 2,
  art_id: arts.first
  }])
