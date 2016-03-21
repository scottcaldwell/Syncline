class RenamingDepthFromAndDepthTo < ActiveRecord::Migration
  def change
    rename_column :layers, :depth_from, :thickness
    rename_column :layers, :depth_to, :layer_order
    change_column :layers, :layer_order, :integer
  end
end
