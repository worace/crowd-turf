require 'sinatra/base'
require 'sinatra/cross_origin'
require 'json'
require './db'

class GroundGameApi < Sinatra::Base
  register Sinatra::CrossOrigin

  def db
    settings.database
  end

  configure do
    set :database, DB.new(Dir.glob("./queries/*.sql"))
    enable :cross_origin
  end

  get '/users' do
    content_type :json
    db.execute(:all_users).to_json
  end

  get '/users/:id' do
    content_type :json
    db.execute(:user_by_id, {id: params[:id]}).first.to_json
  end

  get '/health' do
    content_type :json
    {status: "OK"}.to_json
  end

  get '/nearby' do
  end
end
