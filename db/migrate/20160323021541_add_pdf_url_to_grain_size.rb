class AddPdfUrlToGrainSize < ActiveRecord::Migration
  def change
    add_column :grain_sizes, :pdf_url, :string
  end
end
