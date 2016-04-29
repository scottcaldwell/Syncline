class FieldTest < ActiveRecord::Base
  belongs_to :layer
  has_many :spts, dependent: :destroy
  has_many :photos, dependent: :destroy
end
