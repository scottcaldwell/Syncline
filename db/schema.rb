# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160324211440) do

  create_table "drill_holes", force: true do |t|
    t.string   "name"
    t.float    "ground_elev"
    t.float    "depth"
    t.string   "logged_by"
    t.string   "reviewed_by"
    t.float    "water_level_start"
    t.float    "water_level_during"
    t.float    "water_level_end"
    t.integer  "site_id"
    t.float    "dh_lat"
    t.float    "dh_lng"
    t.float    "hole_size"
    t.string   "method"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "drill_holes", ["site_id"], name: "index_drill_holes_on_site_id"

  create_table "field_tests", force: true do |t|
    t.float    "depth_from"
    t.float    "depth_to"
    t.string   "test_type"
    t.integer  "layer_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "field_tests", ["layer_id"], name: "index_field_tests_on_layer_id"

  create_table "grain_sizes", force: true do |t|
    t.integer  "fines_content"
    t.integer  "lab_test_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "pdf_url"
  end

  add_index "grain_sizes", ["lab_test_id"], name: "index_grain_sizes_on_lab_test_id"

  create_table "lab_tests", force: true do |t|
    t.string   "test_type"
    t.float    "depth_from"
    t.float    "depth_to"
    t.integer  "field_test_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "lab_tests", ["field_test_id"], name: "index_lab_tests_on_field_test_id"

  create_table "layers", force: true do |t|
    t.float    "thickness"
    t.integer  "layer_order"
    t.integer  "material_type_id"
    t.integer  "drill_hole_id"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.date     "date_drilled"
  end

  add_index "layers", ["drill_hole_id"], name: "index_layers_on_drill_hole_id"
  add_index "layers", ["material_type_id"], name: "index_layers_on_material_type_id"

  create_table "material_types", force: true do |t|
    t.string   "name"
    t.string   "hatching"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "photos", force: true do |t|
    t.string   "url"
    t.integer  "field_test_id"
    t.integer  "lab_test_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "photos", ["field_test_id"], name: "index_photos_on_field_test_id"
  add_index "photos", ["lab_test_id"], name: "index_photos_on_lab_test_id"

  create_table "site_users", force: true do |t|
    t.integer  "site_id"
    t.integer  "user_id"
    t.boolean  "admin"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "site_users", ["site_id"], name: "index_site_users_on_site_id"
  add_index "site_users", ["user_id"], name: "index_site_users_on_user_id"

  create_table "sites", force: true do |t|
    t.float    "center_lat"
    t.float    "center_lng"
    t.string   "site_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "drill_to_depth"
    t.date     "drill_by_date"
  end

  create_table "spts", force: true do |t|
    t.integer  "blow_count"
    t.integer  "field_test_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "spts", ["field_test_id"], name: "index_spts_on_field_test_id"

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "password_digest"
  end

end
