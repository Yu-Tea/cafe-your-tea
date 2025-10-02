# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 20_251_001_071_800) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'tea_arts', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.string 'title', null: false
    t.text 'description', null: false
    t.string 'image_url'
    t.string 'ogp_image_url'
    t.integer 'season', default: 0
    t.integer 'temperature', default: 0
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['created_at'], name: 'index_tea_arts_on_created_at'
    t.index ['season'], name: 'index_tea_arts_on_season'
    t.index ['temperature'], name: 'index_tea_arts_on_temperature'
    t.index ['user_id'], name: 'index_tea_arts_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'name', null: false
    t.string 'provider', default: 'email'
    t.string 'uid'
    t.string 'bio', default: 'よろしくお願いします。'
    t.integer 'avatar_preset', default: 1
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'password_digest'
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['uid'], name: 'index_users_on_uid', unique: true
  end

  add_foreign_key 'tea_arts', 'users'
end
