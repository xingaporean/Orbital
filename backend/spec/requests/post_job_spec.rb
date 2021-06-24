require 'rails_helper'

describe "post a job route", :type => :request do
  
  # #Error here with user not being created in database
  # before(:each) do
  #   @user = create(:user)
  #   @start = Date.current
  #   @end = Date.current + 1.week

  #   post '/api/v1/jobs', params: { 
  #     job: {
  #       identifier: "Test_Identifier",
  #       organisation_name: "Test_Org_Name",
  #       description: "Test_Description",
  #       location: "Test_Location", 
  #       start_date: @start, 
  #       end_date: @end, 
  #       user_id: 1
  #     }
  #   }, as: :json

  #   puts response.body
  # end

  # it 'returns the job\'s identifier' do
  #   expect(JSON.parse(response.body)['identifier']).to eq("Test_Identifier")
  # end

  # it 'returns the job\'s organisation_name' do
  #   expect(JSON.parse(response.body)['organisation_name']).to eq("Test_Org_Name")
  # end

  # it 'returns the job\'s description' do
  #   expect(JSON.parse(response.body)['description']).to eq("Test_Description")
  # end

  # it 'returns the job\'s location' do
  #   expect(JSON.parse(response.body)['location']).to eq("Test_Location")
  # end

  # it 'returns the job\'s start_date' do
  #   expect(JSON.parse(response.body)['start_date']).to eq(@start)
  # end

  # it 'returns the job\'s end_date' do
  #   expect(JSON.parse(response.body)['end_date']).to eq(@end)
  # end

  # it 'returns the job\'s user_id' do
  #   expect(JSON.parse(response.body)['user_id']).to eq(@user.id)
  # end

  # it 'returns the job\'s approved boolean' do
  #   expect(JSON.parse(response.body)['approved']).to eq(false)
  # end

  # it 'returns a created status' do
  #   expect(response).to have_http_status(:created)
  # end

  describe "POST /api/v1/jobs to create new job " do
    context "with valid parameters" do
      let(:valid_params) do 
        {
          job: 
          {
            identifier: "Test_Identifier",
            organisation_name: "Test_Org_Name",
            description: "Test_Description",
            location: "Test_Location", 
            start_date: Date.today, 
            end_date: Date.today, 
          }
        }
      end

      it "should create a new job" do
        expect {post '/api/v1/jobs', params: valid_params }.to change(Job, :count).by(+1)
        expect(response).to have_http_status :created
      end

      it "should create a correct job with correct attributes" do
        post '/api/v1/jobs', params: valid_params
        expect(Job.last).to have_attributes valid_params[:job]
      end

      it "should return a correct json response" do
        post '/api/v1/jobs', params: valid_params 
        # deepsymbolizekeys converts serialized json to ruby hash
        json = JSON.parse(response.body).deep_symbolize_keys 
        expect(json[:organisation_name]).to eq("Test_Org_Name")
      end

    end

    context "with invalid parameters" do
      let(:invalid_params) do
        {
          job: 
          {
            identifier: "wrong stuff",
          }
        }
      end

      it "should not create a new job" do
        expect {post '/api/v1/jobs', params: invalid_params }.to change(Job, :count).by(+0)
      end

      it "should not have created status and should have error status" do
        post '/api/v1/jobs', params: invalid_params
        expect(response).not_to have_http_status :created
        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end

  describe 'assocations are valid' do

    it "Job should have one user" do 
      assoc = Job.reflect_on_association(:user)
      expect(assoc.macro).to eq :belongs_to
    end

    it "User should have many jobs" do
      assoc = User.reflect_on_association(:jobs)
      expect(assoc.macro).to eq :has_many
    end
  end


end