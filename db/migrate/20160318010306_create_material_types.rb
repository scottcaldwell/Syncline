class CreateMaterialTypes < ActiveRecord::Migration
  def change
    create_table :material_types do |t|
      t.string :name
      t.string :hatching

      t.timestamps
    end
  end
end
