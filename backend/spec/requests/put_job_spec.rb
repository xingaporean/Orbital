require 'rails_helper'

describe "PUT /api/v1/jobs/:id" do
  before(:each) do
    @job = create(:random_job)
  end

  it 'updates a job' do
    @new_location = Faker::Address.street_name
    @new_description = Faker::Lorem.paragraphs
    @new_start_Date = Faker::Date.forward(days: 31)

    put "/api/v1/jobs/#{@job.id}", params: {
      job: {
        location: @new_location, 
        description: @new_description, 
        start_date: @new_start_Date
      }
    }
    # Job not updated
    expect(response.status).to eq(200)
    expect(Job.find(@job.id).location).to eq(@new_location)
    expect(Job.find(@job.id).description).to eq(@new_description)
    expect(Job.find(@job.id).start_date).to eq(@new_start_Date)
  end
end