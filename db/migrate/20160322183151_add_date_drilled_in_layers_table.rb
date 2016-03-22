class AddDateDrilledInLayersTable < ActiveRecord::Migration
  def change
    add_column :layers, :date_drilled, :date
  end
end
