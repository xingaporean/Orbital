require 'rails_helper'

describe "get all jobs route", :type => :request do
  let!(:jobs) {FactoryBot.create_list(:random_job, 20)}

  before {get '/api/v1/jobs'}

  it 'returns all jobs' do
    expect(JSON.parse(response.body).size).to eq(20)
  end

  it 'returns status code 200' do
    expect(response).to have_http_status(:success)
  end
end