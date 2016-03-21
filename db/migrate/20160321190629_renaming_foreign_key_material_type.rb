class RenamingForeignKeyMaterialType < ActiveRecord::Migration
  def change
    rename_column :layers, :material_id, :material_type_id
  end
end
