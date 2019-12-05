class AddArtToComment < ActiveRecord::Migration[6.0]
  def change
    add_reference :comments, :art, null: false, foreign_key: true
  end
end
