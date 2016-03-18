class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :url
      t.belongs_to :field_test, index: true
      t.belongs_to :lab_test, index: true

      t.timestamps
    end
  end
end
