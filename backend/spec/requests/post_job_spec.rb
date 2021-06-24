require 'rails_helper'

describe "post a job route", :type => :request do
  
  #Error here with user not being created in database
  before(:all) do
    #@user = create(:user)
    @start = Date.current
    @end = Date.current + 1.week
    @user = User.create(:email => 'UserA' + "@gmail.com", 
                        :password_digest => "123", 
                        :is_admin => false,
                        :id => 1)
  end

  before do
    post '/api/v1/jobs', params: { 
      job: {
        identifier: "Test_Identifier",
        organisation_name: "Test_Org_Name",
        description: "Test_Description",
        location: "Test_Location", 
        start_date: @start, 
        end_date: @end, 
        user_id: @user.id
      }
    }, as: :json

    puts response.body
  end


  it 'returns the job\'s identifier' do
    expect(JSON.parse(response.body)['identifier']).to eq("Test_Identifier")
  end

  it 'returns the job\'s organisation_name' do
    expect(JSON.parse(response.body)['organisation_name']).to eq("Test_Org_Name")
  end

  it 'returns the job\'s description' do
    expect(JSON.parse(response.body)['description']).to eq("Test_Description")
  end

  it 'returns the job\'s location' do
    expect(JSON.parse(response.body)['location']).to eq("Test_Location")
  end

  it 'returns the job\'s start_date' do
    expect(JSON.parse(response.body)['start_date']).to eq(@start)
  end

  it 'returns the job\'s end_date' do
    expect(JSON.parse(response.body)['end_date']).to eq(@end)
  end

  it 'returns the job\'s user_id' do
    expect(JSON.parse(response.body)['user_id']).to eq(@user.id)
  end

  it 'returns the job\'s approved boolean' do
    expect(JSON.parse(response.body)['approved']).to eq(false)
  end

  it 'returns a created status' do
    expect(response).to have_http_status(:created)
  end
end