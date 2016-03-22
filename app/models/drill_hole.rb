class DrillHole < ActiveRecord::Base
  belongs_to :site
  has_many :layers

  validates :site_id,
    presence: true

  private 

    def get_layers
      @layers = self.layers.all
    end

end
