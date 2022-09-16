# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
def bycrypt(password)
  pass = BCrypt::Password.create(password)
end

user1 = User.create(
  username: "Sammy",
  password_digest: bycrypt("@sammy12"),
  role: "admin",
  email: "example@email.com"
)

user2 = User.create(
  username: "Jphnte",
  password_digest: bycrypt("@user12"),
  role: "user",
  email: "example@email.com"

)


user3 = User.create(
  username: "Tempest",
  password_digest: bycrypt("@tempe12"),
  email: "example@email.com",
  role: "user"
)
puts "####### DONE SEEDING ######"