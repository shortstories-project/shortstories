Hanami::Model.migration do
  change do
    add_column :stories, :state, String, null: false, default: 'unapproved'
  end
end
