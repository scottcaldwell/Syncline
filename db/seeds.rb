# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
5.times do
  User.create(
  email: Faker::Internet.email,
  password: 123456,
  password_confirmation: 123456,
  first_name: Faker::Name.last_name,
  last_name: Faker::Name.first_name,
  )
end

(1..10).each do |n|
  DrillHole.create(
  name: "DH-LHL16-#{n}",
  ground_elev: rand(50..100),
  depth: rand(10.00..15.00),
  logged_by: "PB",
  reviewed_by: "SC",
  water_level_start: rand(0.00..5.00),
  water_level_during: rand(0.00..5.00),
  water_level_end: rand(0.00..5.00),
  site_id: 0,
  dh_lat: rand(49.2820000..49.2821000),
  dh_lng: -rand(123.1080000..123.1081000),
  hole_size: 7.5,
  method: "Auger"
  )
end


MaterialType.create(
  name: "Gravel"
)
MaterialType.create(
  name: "Sand"
)
MaterialType.create(
  name: "Silt"
)
MaterialType.create(
  name: "Clay"
)

Site.create(
  site_name: "Lighthouse Labs",
  center_lat: 49.282002,
  center_lng: -123.108176
)

Site.create(
  site_name: "YVR",
  center_lat: 49.193476,
  center_lng: -123.176327
)

Site.create(
  site_name: "Science World",
  center_lat: 49.273415,
  center_lng: -123.103695
)

(0..9).each do |n|
  num_layers = rand(2..5)
  layer_thickness = (DrillHole.all[n].depth)/num_layers
  i = 0
  while i < num_layers
    Layer.create(
    thickness: layer_thickness,
    layer_order: i,
    material_type_id: MaterialType.all[rand(0..3)].id,
    drill_hole_id: DrillHole.all[n].id,
    description: Faker::Lorem.paragraph
    )
    i += 1
  end
end
FieldTest.create(
  depth_from: DrillHole.all[0].depth/4,
  depth_to: (DrillHole.all[0].depth/4 + 0.5),
  test_type: "SPT",
  layer_id: Layer.all[0].id
)
FieldTest.create(
  depth_from: DrillHole.all[0].depth/3,
  depth_to: (DrillHole.all[0].depth/3 + 0.5),
  test_type: "SPT",
  layer_id: Layer.all[1].id
)
FieldTest.create(
  depth_from: DrillHole.all[0].depth/2,
  depth_to: (DrillHole.all[0].depth/2 + 0.5),
  test_type: "SPT",
  layer_id: Layer.all[2].id
)

LabTest.create(
  depth_from: FieldTest.all[0].depth_from,
  depth_to: FieldTest.all[0].depth_to,
  field_test_id: FieldTest.all[0].id
)
LabTest.create(
  depth_from: FieldTest.all[1].depth_from,
  depth_to: FieldTest.all[1].depth_to,
  field_test_id: FieldTest.all[1].id
)
LabTest.create(
  depth_from: FieldTest.all[2].depth_from,
  depth_to: FieldTest.all[2].depth_to,
  field_test_id: FieldTest.all[2].id
)

Photo.create(
  url: 'app/assets/images/drill_hole_pics/image1',
  field_test_id: FieldTest.all[0].id,
  lab_test_id: LabTest.all[0].id
)
Photo.create(
  url: 'app/assets/images/drill_hole_pics/image5',
  field_test_id: FieldTest.all[1].id,
  lab_test_id: LabTest.all[1].id
)
Photo.create(
  url: 'app/assets/images/drill_hole_pics/image9',
  field_test_id: FieldTest.all[2].id,
  lab_test_id: LabTest.all[2].id
)

SiteUser.create(
  site_id: Site.all[0].id,
  user_id: User.all[0].id,
  admin: true
)
SiteUser.create(
  site_id: Site.all[0].id,
  user_id: User.all[1].id,
  admin: false
)
SiteUser.create(
  site_id: Site.all[0].id,
  user_id: User.all[2].id,
  admin: false
)
SiteUser.create(
  site_id: Site.all[0].id,
  user_id: User.all[3].id,
  admin: false
)
SiteUser.create(
  site_id: Site.all[0].id,
  user_id: User.all[4].id,
  admin: false
)
