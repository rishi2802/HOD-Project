# app.py (Flask Backend)
from flask import Flask, render_template, request, jsonify
import csv

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/dashboard', methods=['POST'])
def dashboard():
    # Check login credentials (dummy authentication)
    username = request.form['username']
    password = request.form['password']
    if username == 'sunu' and password == 'admin':
        return render_template('dashboard.html', username=username)
    else:
        return render_template('login.html', message='Invalid credentials')

@app.route('/submit', methods=['POST'])
def submit():
    # Process form data and calculate total marks
    data = request.form.to_dict()

    # Calculate total marks
    academic_marks = int(data['results']) + int(data['feedbacks'])
    research_marks = (int(data['national_conference']) * 2) + (int(data['international_conference']) * 3) + \
                     (int(data['national_journal']) * 4) + (int(data['international_journal']) * 6)
    project_guidance_marks = (int(data['ug_projects']) * 2) + (int(data['pg_projects']) * 4) + \
                             (int(data['phd_projects']) * 6)
    industry_related_marks = (int(data['industry_projects']) * 4) + (int(data['consultancy']) * 4)
    faculty_organized_events_marks = int(data['organized_events']) * 3
    faculty_attended_events_marks = int(data['attended_events']) * 4

    administrative_duties = data['administrative_duties']
    administrative_marks = 0
    if administrative_duties in ['hod', 'club_incharge', 'lab_incharge', 'time_table_incharge', 'bus_incharge',
                                  'hostel_duty', 'iso_iqac']:
        administrative_marks = 5

    total_marks = academic_marks + research_marks + project_guidance_marks + industry_related_marks + \
                  faculty_organized_events_marks + faculty_attended_events_marks + administrative_marks

    # Write data to CSV
    with open('marks.csv', mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=data.keys())
        writer.writeheader()
        writer.writerow(data)

    return jsonify({'message': 'Marks submitted successfully', 'total_marks': total_marks})

if __name__ == '__main__':
    app.run(debug=True)
