class Layer < ActiveRecord::Base
  belongs_to :material
  belongs_to :drill_hole
  has_many :field_tests, :lab_tests
end
