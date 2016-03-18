class Layer < ActiveRecord::Base
  belongs_to :material
  belongs_to :drill_hole
end
