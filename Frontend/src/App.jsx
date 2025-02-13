import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";

export default function CourseApp() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", number: "", professor: "", info: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCourse = () => {
    if (!form.title || !form.number || !form.professor) return;
    setCourses([...courses, { ...form, id: Date.now() }]);
    setForm({ title: "", number: "", professor: "", info: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="flex justify-between mb-6">
        <div className="space-x-4">
          <Button variant="outline">Course List</Button>
          <Button variant="outline">Button 2</Button>
          <Button variant="outline">Button 3</Button>
        </div>
        <div>
          <Button variant="ghost">Login / Logout</Button>
          <Button variant="ghost">Register</Button>
        </div>
      </div>
      
      {/* Search Bar */}
      <Input
        placeholder="Search for Course"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {/* Add Course Form */}
      <Card className="p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Add a Course</h2>
        <Input name="title" placeholder="Course Title" value={form.title} onChange={handleChange} className="mb-2" />
        <Input name="number" placeholder="Course Number" value={form.number} onChange={handleChange} className="mb-2" />
        <Input name="professor" placeholder="Teacher/Prof" value={form.professor} onChange={handleChange} className="mb-2" />
        <Input name="info" placeholder="Course Info" value={form.info} onChange={handleChange} className="mb-4" />
        <Button onClick={addCourse}>Add Course</Button>
      </Card>

      {/* Course List */}
      <div>
        {courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase())).map((course) => (
          <Card key={course.id} className="mb-2">
            <CardContent>
              <h3 className="text-lg font-bold">{course.title} ({course.number})</h3>
              <p className="text-sm">Instructor: {course.professor}</p>
              <p className="text-xs text-gray-600">{course.info}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
