import './Curriculum.css'

export default function Curriculum() {
  return <div className="curriculum">
    <section aria-labelledby="outcomes-heading">
      <h2 id="outcomes-heading">Experiences and outcomes</h2>
      <dl className="curriculum-outcomes">
        <div><dt>TCH 3-15a</dt><dd>I can select appropriate development tools to design, build, evaluate and refine computing solutions based on requirements</dd></div>
        <div><dt>TCH 3-14a</dt><dd>I understand language constructs for representing structured information</dd></div>
      </dl>
    </section>
    <section aria-labelledby="benchmarks-heading">
      <h2 id="benchmarks-heading">Benchmarks supported by this unit</h2>
      <ul className="curriculum-benchmarks">
        <li>Reads and explains code extracts including those with variables and data structures</li>
        <li>Interprets a problem statement, and identifies processes and information to create a physical computing and/or software solution.</li>
        <li>Can find and correct errors in program logic.</li>
      </ul>
      <p className="curriculum-scope">This unit develops reading code with variables; data structures are not covered. Python also develops skills in loops, selection and subroutines. The benchmarks that specifically require a visual programming language are not fully met by this text-based Python unit.</p>
    </section>
  </div>
}