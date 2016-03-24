# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

User.create(
email: 'joelkbennett@gmail.com',
password: 123456,
password_confirmation: 123456,
first_name: 'Joel',
last_name: 'Bennett'
)

User.create(
email: 'prabh182006@gmail.com',
password: 123456,
password_confirmation: 123456,
first_name: 'Prabh',
last_name: 'Singh Brar'
)

User.create(
email: 'scottc.caldwell@gmail.com',
password: 123456,
password_confirmation: 123456,
first_name: 'Scott',
last_name: 'Caldwell'
)

User.create(
email: 'steven.d.richards@gmail.com',
password: 123456,
password_confirmation: 123456,
first_name: 'Steve',
last_name: 'Richards'
)


5.times do
  User.create(
  email: Faker::Internet.email,
  password: 123456,
  password_confirmation: 123456,
  first_name: Faker::Name.last_name,
  last_name: Faker::Name.first_name,
  )
end

Site.create(
site_name: "Syncline Headquarters",
center_lat: 49.411133,
center_lng: -123.091066
)
Site.create(
site_name: "Lighthouse Labs",
center_lat: 49.282002,
center_lng: -123.108176
)
Site.create(
site_name: "Science World",
center_lat: 49.273415,
center_lng: -123.103695
)

(1..10).each do |n|
  DrillHole.create(
  name: "DH-LHL16-#{n}",
  ground_elev: rand(50..100),
  depth: rand(10.00..15.00),
  logged_by: "PB",
  water_level_start: rand(0.00..5.00),
  water_level_during: rand(0.00..5.00),
  water_level_end: rand(0.00..5.00),
  site_id: 1,
  dh_lat: rand(49.411133..49.415450),
  dh_lng: -1 * rand(123.084171..123.091066),
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
    description: Faker::Lorem.paragraph,
    date_drilled: "2016-01-#{n + 1}"
    )
    i += 1
  end
end

loop_num = 0
(0..9).each do |n|
  num_layers = Layer.where(drill_hole_id: DrillHole.all[n].id).count - 1
  (0..num_layers).each do |i|
    FieldTest.create(
    depth_from: DrillHole.all[n].depth/(10/(i+1)),
    depth_to: DrillHole.all[n].depth/(10/(i+1)) + 0.5,
    test_type: "SPT",
    layer_id: Layer.all[loop_num].id
    )
    loop_num += 1
  end
end

loop_num = 0
(0..9).each do |n|
  num_layers = Layer.where(drill_hole_id: DrillHole.all[n].id).count - 1
  (0..num_layers).each do |i|
    LabTest.create(
    test_type: "Grain Size",
    depth_from: FieldTest.all[i].depth_from,
    depth_to: FieldTest.all[i].depth_to,
    field_test_id: FieldTest.all[loop_num].id
    )
    loop_num += 1
  end
end

loop_num = 0
(0..9).each do |n|
  num_layers = Layer.where(drill_hole_id: DrillHole.all[n].id).count - 1
  (0..num_layers).each do |i|
    Photo.create(
    url: "app/assets/images/drill_hole_pics/image#{rand(1..30)+rand(1..30)}.png",
    field_test_id: FieldTest.all[loop_num].id,
    lab_test_id: LabTest.all[loop_num].id
    )
      loop_num += 1
  end
end

num_field_tests = FieldTest.all.count
(1..num_field_tests).each do |n|
  Spt.create(
  blow_count: rand(5..20),
  field_test_id: n
  )
end

num_lab_tests = LabTest.all.count
(1..num_lab_tests).each do |n|
  GrainSize.create(
  fines_content: rand(10..90),
  lab_test_id: n,
  pdf_url: "app/assets/images/grain_size_pdf/grainsizepdf#{n}.pdf"
  )
end

(0..3).each do |n|
  SiteUser.create(
  site_id: Site.all[0].id,
  user_id: User.all[n].id,
  admin: true
  )
end
(0..3).each do |n|
  SiteUser.create(
  site_id: Site.all[1].id,
  user_id: User.all[n].id,
  admin: true
  )
end
(0..3).each do |n|
  SiteUser.create(
  site_id: Site.all[2].id,
  user_id: User.all[n].id,
  admin: true
  )
end

Project.create(
drill_to_depth: DrillHole.sum(:depth),
drill_by_date: Layer.last.date_drilled + 3.days,
site_id: 1
)
