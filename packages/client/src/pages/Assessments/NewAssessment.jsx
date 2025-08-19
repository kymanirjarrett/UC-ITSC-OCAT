import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';
import { useForm } from 'react-hook-form';

export const NewAssessment = () => {

  const [form, setForm] = useState({
    catName: '',
    dob: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await AssessmentService.submit(form);
    // Optionally reset form or show success message here
  };

  return (
    
    <Form onSubmit={onSubmit}>

      <h2> Cat Behavioral Instrument </h2>

      <Form.Group controlId="catName" className='mt-3'>
        <Form.Label>Cat's Name</Form.Label>
        <Form.Control
          type="text"
          name="catName"
          value={form.catName}
          onChange={handleChange}
          placeholder="Enter cat's name"
          required
        />
      </Form.Group>

      <Form.Group controlId="dob" className="mt-3">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="prevContact" className="mt-3">
        <Form.Label>Previous Contact with the Cat Judicial System</Form.Label>
        <div>
          <Form.Check
            type ="radio"
            label="Yes"
            name="prevContact"
            value="yes"
            checked={form.prevContact === 'yes'}
            onChange={handleChange}
            required
          />
          <Form.Check
            type="radio"
            label="No"
            name="prevContact"
            value="no"
            checked={form.prevContact === 'no'}
            onChange={handleChange}
            required
          />
        </div>
      </Form.Group>

      <Form.Group controlId="catAltercations" className="mt-3">
        <Form.Label>Physical Altercations with other Cats</Form.Label>
        <div>
          <Form.Check
            type ="radio"
            label="Yes"
            name="catAltercations"
            value="yes"
            checked={form.catAltercations === 'yes'}
            onChange={handleChange}
            required
          />
          <Form.Check
            type="radio"
            label="No"
            name="catAltercations"
            value="no"
            checked={form.catAltercations === 'no'}
            onChange={handleChange}
            required
          />
        </div>
      </Form.Group>

      <Form.Group controlId="ownerAltercations" className="mt-3">
        <Form.Label>Physical Altercations with owner (scratching, biting, etc...)</Form.Label>
        <div>
          <Form.Check
            type ="radio"
            label="Yes"
            name="ownerAltercations"
            value="yes"
            checked={form.ownerAltercations === 'yes'}
            onChange={handleChange}
            required
          />
          <Form.Check
            type="radio"
            label="No"
            name="ownerAltercations"
            value="no"
            checked={form.ownerAltercations === 'no'}
            onChange={handleChange}
            required
          />
        </div>
      </Form.Group>

      <Form.Group controlId="dogPlay" className="mt-3">
        <Form.Label>Plays well with dogs</Form.Label>
        <div>
          <Form.Check
            type ="radio"
            label="Yes"
            name="dogPlay"
            value="yes"
            checked={form.dogPlay === 'yes'}
            onChange={handleChange}
            required
          />
          <Form.Check
            type="radio"
            label="No"
            name="dogPlay"
            value="no"
            checked={form.dogPlay === 'no'}
            onChange={handleChange}
            required
          />
        </div>
      </Form.Group>

      <Form.Group controlId="hissStranger" className="mt-3">
        <Form.Label> Hisses at strangers </Form.Label>
        <div>
          <Form.Check
            type ="radio"
            label="Yes"
            name="hissStranger"
            value="yes"
            checked={form.hissStranger === 'yes'}
            onChange={handleChange}
            required
          />
          <Form.Check
            type="radio"
            label="No"
            name="hissStranger"
            value="no"
            checked={form.hissStranger === 'no'}
            onChange={handleChange}
            required
          />
        </div>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-4">
        Submit
      </Button>

    </Form>
  );
};