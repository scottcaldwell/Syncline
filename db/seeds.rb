# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
# 5.times do
#   User.create(
#   email: Faker::Internet.email,
#   password: 123456,
#   password_confirmation: 123456,
#   first_name: Faker::Name.last_name,
#   last_name: Faker::Name.first_name,
#   )
# end

# (1..10).each do |n|
#   DrillHole.create(
#   name: "DH-LHL16-#{n}",
#   ground_elev: rand(50..100),
#   depth: rand(10.00..15.00),
#   logged_by: "PB",
#   reviewed_by: "SC",
#   water_level_start: rand(0.00..5.00),
#   water_level_during: rand(0.00..5.00),
#   water_level_end: rand(0.00..5.00),
#   site_id: 0,
#   dh_lat: rand(49.2820000..49.2821000),
#   dh_lng: rand(-123.1080000..-123.1081000),
#   hole_size: 7.5,
#   method: "Auger"
#   )
# end


# MaterialType.create(
#   name: "Gravel"
# )
# MaterialType.create(
#   name: "Sand"
# )
# MaterialType.create(
#   name: "Silt"
# )
# MaterialType.create(
#   name: "Clay"
# )
#
# Site.create(
#   site_name: "Lighthouse Labs"
# )
#
# Site.create(
#   site_name: "Launch Academy"
# )
#
# Site.create(
#   site_name: "The Hive"
# )

# (0..9).each do |n|
#   num_layers = rand(2..5)
#   layer_thickness = (DrillHole.all[n].depth)/num_layers
#   i = 0
#   depth_from = 0
#   depth_to = 0
#   while i < num_layers
#     if i > 0
#       depth_from = depth_to
#     end
#     Layer.create(
#     depth_from: depth_from,
#     depth_to: depth_from + layer_thickness,
#     material_id: rand(1..4),
#     drill_hole_id: n,
#     description: Faker::Lorem.paragraph
#     )
#     depth_to += layer_thickness
#     i += 1
#   end
# end
