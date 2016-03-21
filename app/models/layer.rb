class Layer < ActiveRecord::Base
  belongs_to :material_type
  belongs_to :drill_hole
  has_many :field_tests
  has_many :lab_tests
end
