class DrillHole < ActiveRecord::Base
  belongs_to :site
  has_many :layers
end
