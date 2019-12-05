class CreateArts < ActiveRecord::Migration[6.0]
  def change
    create_table :arts do |t|
      t.string :username
      t.string :art_name
      t.text :url
      t.text :description

      t.timestamps
    end
  end
end
