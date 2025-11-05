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

ActiveRecord::Schema[7.1].define(version: 2025_11_04_043534) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.bigint "tea_art_id", null: false
    t.bigint "user_id"
    t.text "body", null: false
    t.boolean "is_guest", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tea_art_id", "created_at"], name: "idx_comments_tea_art_created"
    t.index ["tea_art_id"], name: "idx_comments_tea_art_id"
    t.index ["tea_art_id"], name: "index_comments_on_tea_art_id"
    t.index ["user_id"], name: "idx_comments_user_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "tea_art_tags", force: :cascade do |t|
    t.bigint "tea_art_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tag_id"], name: "index_tea_art_tags_on_tag_id"
    t.index ["tea_art_id", "tag_id"], name: "unique_tea_art_tag", unique: true
    t.index ["tea_art_id"], name: "index_tea_art_tags_on_tea_art_id"
  end

  create_table "tea_arts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title", null: false
    t.text "description", null: false
    t.string "image_url"
    t.string "ogp_image_url"
    t.integer "season", default: 0
    t.integer "temperature", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_tea_arts_on_created_at"
    t.index ["season"], name: "index_tea_arts_on_season"
    t.index ["temperature"], name: "index_tea_arts_on_temperature"
    t.index ["user_id"], name: "index_tea_arts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "name", null: false
    t.string "bio", default: "よろしくお願いします。"
    t.integer "avatar_preset", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "google_uid"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["google_uid"], name: "index_users_on_google_uid", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "comments", "tea_arts"
  add_foreign_key "comments", "users"
  add_foreign_key "tea_art_tags", "tags"
  add_foreign_key "tea_art_tags", "tea_arts"
  add_foreign_key "tea_arts", "users"
end
