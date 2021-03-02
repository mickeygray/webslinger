import React, { useState, useContext, useEffect } from "react";
import FirmContext from "../../context/firm/firmContext";

const FirmForm = () => {
  const firmContext = useContext(FirmContext);
  const { current, putFirm, postFirm, clearCurrentFirm } = firmContext;
  const [firm, setFirm] = useState({
    name: "",
    website: "",
    vertical: "",
    email: "",
    phone: "",
    cpa: "",
    cpapic: "",
    logo: "",
    cpabio: "",
    stars: 0,
    types: "",
    fees: "",
    avgsavings: "",
    minimum: "",
    years: "",
    bbb: "",
    cost: "",
    address: "",
    city: "",
    state: "",
  });

  const [social, setSocial] = useState([
    {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      article1: "",
      article2: "",
      article3: "",
      article4: "",
    },
  ]);

  const onChangeSocial = (i, e) => {
    const { value, name } = e.currentTarget;
    const newResults = [...social];
    newResults[i] = {
      ...newResults[i],
      [name]: value,
    };
    setSocial(newResults);
  };

  const [stats, setStates] = useState([]);
  const [pro, setPros] = useState([]);
  const [con, setCons] = useState([]);

  const [proArr, setProArr] = useState([
    <input
      type='text'
      name='pro1'
      onChange={(e) => setPros([...pro, e.target.value])}
    />,
  ]);
  const [conArr, setConArr] = useState([
    <input
      type='text'
      name='con1'
      onChange={(e) => setCons([...con, e.target.value])}
    />,
  ]);

  const [serviceType, setServiceType] = useState("");

  const review = {
    reviewer: "",
    review: "",
    date: "",
    pic: "",
  };
  const serviceItem = {
    serviceType: "",
    service: "",
    img: "",
    cost: "",
    summary: "",
  };

  const addService = (serviceType) => {
    const serviceItem = {
      serviceType,
      service: "",
      img: "",
      summary: "",
    };
    const newResults = [...serv, { ...serviceItem }];
    setServices(newResults);
  };

  const [reviews, setReviews] = useState([{ ...review }]);
  const [serv, setServices] = useState([{ ...serviceItem }]);

  const onChangeReview = (i, e) => {
    const { value, name } = e.currentTarget;
    const newResults = [...reviews];
    newResults[i] = {
      ...newResults[i],
      [name]: value,
    };
    setReviews(newResults);
  };

  const onChangeService = (i, e) => {
    const { value, name } = e.currentTarget;
    const newResults = [...serv];
    newResults[i] = {
      ...newResults[i],
      [name]: value,
    };
    setServices(newResults);
  };

  const addReview = () => {
    const newResults = [...reviews, { ...review }];
    setReviews(newResults);
  };

  const addCon = () => {
    setConArr([
      ...conArr,
      <input
        type='text'
        name='con'
        onChange={(e) => setCons([...con, e.target.value])}
      />,
    ]);
  };
  const addPro = () => {
    setProArr([
      ...proArr,
      <input
        type='text'
        name='con'
        onChange={(e) => setPros([...pro, e.target.value])}
      />,
    ]);
  };

  useEffect(() => {
    if (current !== null) {
      setFirm({
        name: current.name,
        website: current.website,
        vertical: current.vertical,
        email: current.email,
        phone: current.phone,
        cpa: current.cpa,
        logo: current.logo,
        cpapic: current.cpapic,
        cpabio: current.cpabio,
        stars: current.stars,
        types: current.types,
        fees: current.fees,
        avgsavings: current.avgsavings,
        minimum: current.minimum,
        years: current.years,
        bbb: current.bbb,
        cost: current.cost,
        address: current.address,
        city: current.city,
        state: current.state,
      });

      setStates(current.states);
      setPros(current.pros);
      setCons(current.cons);
      setServices(current.services);
      setReviews(current.reviews);
      setSocial(current.social);
    } else {
      setFirm({
        name: "",
        website: "",
        vertical: "",
        email: "",
        phone: "",
        cpa: "",
        cpapic: "",
        cpabio: "",
        stars: 0,
        types: "",
        fees: "",
        avgsavings: "",
        minimum: "",
        years: "",
        bbb: "",
        cost: "",
        logo: "",
        address: "",
        city: "",
        state: "",
      });
      setStates([]);
      setPros([]);
      setCons([]);
      setSocial([
        {
          facebook: "",
          instagram: "",
          twitter: "",
          linkedin: "",
          article1: "",
          article2: "",
          article3: "",
          article4: "",
        },
      ]);
      setServices([{ ...serviceItem }]);
      setReviews([{ ...review }]);
    }
  }, [current, firmContext]);

  const onChange = (e) => setFirm({ ...firm, [e.target.name]: e.target.value });

  useEffect(() => {
    if (current !== null) {
      current.pros.map((vid, i) => {
        const name = "vid" + i;

        proArr.push(
          <input
            type='text'
            name={name}
            value={vid}
            onChange={(e) => setPros([...pro, e.target.value])}
          />
        );
      });
    }
  }, [current, proArr]);

  useEffect(() => {
    if (current !== null) {
      current.cons.map((vid, i) => {
        const name = "vid" + i;

        conArr.push(
          <input
            type='text'
            name={name}
            value={vid}
            onChange={(e) => setCons([...con, e.target.value])}
          />
        );
      });
    }
  }, [current, conArr]);

  const {
    name,
    website,
    vertical,
    email,
    phone,
    cpa,
    cpapic,
    cpabio,
    stars,
    logo,
    types,
    fees,
    avgsavings,
    minimum,
    years,
    bbb,
    cost,
    address,
    city,
    state,
  } = firm;

  const firmObj = {
    name,
    website,
    vertical,
    email,
    phone,
    cpa,
    cpapic,
    cpabio,
    stars,
    logo,
    types,
    fees,
    avgsavings,
    minimum,
    years,
    bbb,
    cost,
    address,
    city,
    state,
    pro,
    con,
    reviews,
    serv,
  };

  console.log(
    Object.keys(social[0]).map((k) => k),
    "test"
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    function createFormData(formData, key, data) {
      if (data === Object(data) || Array.isArray(data)) {
        for (var i in data) {
          createFormData(formData, key + "[" + i + "]", data[i]);
        }
      } else {
        formData.append(key, data);
      }
    }
    for (let i = 0; i < file.length; i++) {
      formData.append(`${file[i].filename}`, file[i].file);
    }

    createFormData(formData, "reviews", reviews);
    createFormData(formData, "services", serv);
    const revpics = file.map(({ filename, reviewIndex, revIttId }) => {
      let obj = {
        filename,
        reviewIndex,
        revIttId,
      };
      return obj;
    });

    formData.append("name", firm.name);
    formData.append("revpics", revpics);
    formData.append("website", firm.website);
    formData.append("vertical", firm.vertical);
    formData.append("email", firm.email);
    formData.append("phone", firm.phone);
    formData.append("stars", firm.stars);
    formData.append("cpa", firm.cpa);
    formData.append("socialLinks", social);
    formData.append("cpabio", firm.cpabio);
    formData.append("fees", firm.fees);
    formData.append("avgsavings", firm.avgsavings);
    formData.append("minimum", firm.minimum);
    formData.append("years", firm.years);
    formData.append("bbb", firm.bbb);
    formData.append("cost", firm.cost);
    formData.append("address", firm.address);
    formData.append("city", firm.city);
    formData.append("state", firm.state);
    formData.append("pros", pro);
    formData.append("cons", con);
    formData.append("logo", filebody[0] ? `${filebody[0].name}` : "");
    formData.append("cpapic", filebody[0] ? `${filebody[1].name}` : "");
    formData.append(
      filebody[0] ? `${filebody[0].name}` : "",
      filebody[0] ? filebody[0] : ""
    );
    formData.append(
      filebody[1] ? `${filebody[1].name}` : "",
      filebody[1] ? filebody[1] : ""
    );
    if (current !== null) {
      const _id = current._id;
      putFirm(formData, _id);
    } else {
      postFirm(formData);
    }
    clearCurrentFirm();
  };

  const onChangeServiceFile = (i, e) => {
    const { files, name } = e.target;
    const newResults = [...serv];
    newResults[i] = {
      ...newResults[i],
      [name]: files[0].name,
    };
    setServices(newResults);
  };

  const onChangeReviewFile = (i, e) => {
    const { files, name } = e.target;
    const newResults = [...reviews];
    newResults[i] = {
      ...newResults[i],
      [name]: files[0].name,
    };
    setReviews(newResults);
  };

  const [filebody, setFiles] = useState([]);
  const [file, setFile] = useState([]);

  function readmultifiles(e) {
    const files = e.target.files;
    Object.keys(files).forEach((i) => {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        filebody.push(file);
      };
      reader.readAsBinaryString(file);
    });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='grid-2'>
          <div className='bg-light card'>
            {" "}
            <label htmlFor='name'>Firm Name</label>
            <input type='text' onChange={onChange} name='name' value={name} />
            <label htmlFor='name'>Vertical Simple</label>
            <input
              type='text'
              onChange={onChange}
              name='vertical'
              value={vertical}
            />
            <label htmlFor='name'>Address</label>
            <input
              type='text'
              onChange={onChange}
              name='address'
              value={address}
            />
            <label htmlFor='name'>City</label>
            <input type='text' onChange={onChange} name='city' value={city} />
            <label htmlFor='name'>State</label>
            <input type='text' onChange={onChange} name='state' value={state} />
            <label htmlFor='name'>Website</label>
            <input
              type='text'
              onChange={onChange}
              name='website'
              value={website}
            />
            <label htmlFor='name'>BBB</label>
            <input
              type='text'
              onChange={onChange}
              name='bbb'
              value={bbb}
            />{" "}
            <label htmlFor='name'>Featured Employee Name</label>
            <input
              type='text'
              onChange={onChange}
              name='cpa'
              value={cpa}
            />{" "}
            <label htmlFor='name'>Featured Employee Bio</label>
            <input
              type='text'
              onChange={onChange}
              name='cpabio'
              value={cpabio}
            />{" "}
          </div>
          <div className='card bg-light'>
            {" "}
            <label htmlFor='name'>Email</label>
            <input type='text' onChange={onChange} name='email' value={email} />
            <label htmlFor='name'>Phone</label>
            <input type='text' onChange={onChange} name='phone' value={phone} />
            <label htmlFor='name'>Stars</label>
            <input type='text' onChange={onChange} name='stars' value={stars} />
            <label htmlFor='name'>Cost</label>
            <input
              type='text'
              onChange={onChange}
              name='cost'
              value={cost}
            />{" "}
            <label htmlFor='name'>Fee Explanation</label>
            <input
              type='text'
              onChange={onChange}
              name='fees'
              value={fees}
            />{" "}
            <label htmlFor='name'>Minimum</label>
            <input
              type='text'
              onChange={onChange}
              name='minimum'
              value={minimum}
            />{" "}
            <label htmlFor='name'>Years</label>
            <input
              type='text'
              onChange={onChange}
              name='years'
              value={years}
            />{" "}
            <label htmlFor='name'>Average Savings</label>
            <input
              type='text'
              onChange={onChange}
              name='avgsavings'
              value={avgsavings}
            />
          </div>
        </div>
        <div className='grid-2'>
          <div className='card bg-light'>
            {" "}
            <label htmlFor='name'>Pros</label>
            <button
              type='button'
              className='btn btn-block btn-secondary'
              onClick={() => addPro()}>
              Add Pro
            </button>
            <ul>
              {proArr.map((pro) => (
                <li>{pro}</li>
              ))}
            </ul>
          </div>
          <div className='card bg-light'>
            {" "}
            <label htmlFor='name'>Cons</label>
            <button
              type='button'
              className='btn btn-block btn-secondary'
              onClick={() => addCon()}>
              Add Con
            </button>
            <ul>
              {conArr.map((con) => (
                <li>{con}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='bg-light'>
          <h5 className='text-center'>Social Media</h5>
          <div className='grid-2'>
            <div className='bg-light'>
              {social.map((row, i) => (
                <div key={i} className='row'>
                  {Object.keys(row)
                    .filter((k) => !k.includes("article"))
                    .map((key) => (
                      <div>
                        <label key={key}>
                          {key.slice(0, 1).toUpperCase() +
                            key.slice(1, key.length)}{" "}
                        </label>
                        <br />
                        <input
                          type='text'
                          value={row[key]}
                          name={key}
                          onChange={(e) => onChangeSocial(i, e)}
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <div className='bg-light'>
              {social.map((row, i) => (
                <div key={i} className='row'>
                  {Object.keys(row)
                    .filter((k) => k.includes("article"))
                    .map((key) => (
                      <div>
                        <label key={key}>
                          {key.slice(0, 1).toUpperCase() +
                            key.slice(1, key.length)}{" "}
                        </label>
                        <br />
                        <input
                          type='text'
                          value={row[key]}
                          name={key}
                          onChange={(e) => onChangeSocial(i, e)}
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='bg-light card'>
          <h5 className='text-center'>Customer Reviews</h5>
          <div className='grid-2'>
            <div className='card'>
              <button
                type='button'
                className='btn btn-primary btn-block'
                onClick={() => addReview()}>
                Add New Review
              </button>
            </div>
          </div>

          <div className='grid-3'>
            {reviews.map((result, i) => (
              <div key={i}>
                <div>
                  <label>Reviewer: </label>
                  <br />
                  <input
                    type='text'
                    value={result.reviewer}
                    name='reviewer'
                    onChange={(e) => onChangeReview(i, e)}
                  />
                </div>
                <div>
                  <label> Review: </label>
                  <br />

                  <input
                    type='text'
                    value={result.review}
                    name='review'
                    onChange={(e) => onChangeReview(i, e)}
                  />
                </div>
                <div>
                  <label> Date:</label>
                  <br />

                  <input
                    type='text'
                    value={result.date}
                    name='date'
                    onChange={(e) => onChangeReview(i, e)}
                  />
                </div>
                <div>
                  <label htmlFor='images'>Review Image</label>
                  <input
                    type='text'
                    name='img'
                    value={result.img}
                    onChange={(e) => onChangeService(i, e)}
                    disabled
                  />
                  <label htmlFor='images'>Upload Review Image Here</label>
                  <input
                    type='file'
                    name='img'
                    onChange={(e) => {
                      onChangeReviewFile(i, e);
                      setFile([...file, e.target.files[0]]);
                    }}
                    style={{ width: "200px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='bg-light'>
          <h5 className='text-center'>Add Services And Sale Items</h5>
          <div className='grid-2'>
            <div className='card'>
              {" "}
              {serv.map((serv, i) => (
                <div key={i}>
                  <div
                    style={serv.serviceType === "" ? { display: "none" } : {}}>
                    <label>
                      {serv.serviceType ? serv.serviceType : serviceType}{" "}
                      Service
                    </label>
                    <br />
                    <input
                      type='text'
                      value={serv.service}
                      name='service'
                      onChange={(e) => onChangeService(i, e)}
                    />
                    <br />
                    <label>
                      {serv.serviceType ? serv.serviceType : serviceType}{" "}
                      Summary
                    </label>
                    <input
                      type='text'
                      value={serv.summary}
                      name='summary'
                      onChange={(e) => onChangeService(i, e)}
                    />
                    <br />
                    <label>
                      {serv.serviceType ? serv.serviceType : serviceType} Cost
                    </label>
                    <input
                      type='text'
                      value={serv.cost}
                      name='cost'
                      onChange={(e) => onChangeService(i, e)}
                    />

                    <label htmlFor='images'>Service Image</label>
                    <input
                      type='text'
                      name='img'
                      value={serv.img}
                      onChange={(e) => onChangeService(i, e)}
                      disabled
                    />
                    <label htmlFor='images'>Upload Service Image Here</label>
                    <input
                      type='file'
                      name='img'
                      onChange={(e) => {
                        onChangeServiceFile(i, e);
                        setFile([...file, e.target.files[0]]);
                      }}
                      style={{ width: "200px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className='card py-1'>
              <select
                name='serviceType'
                onChange={(e) => setServiceType(e.target.value)}>
                <option value=''></option>
                <option value='taxrelief'>Tax Relief</option>
                <option value='accounting'>Accounting</option>
                <option value='investment'>Investment</option>
                <option value='consulting'>Consulting</option>
                <option value='loan/credit'>Loan or Credit</option>
                <option value='crm'>CRM or ERP</option>
                <option value='other'>Other</option>
              </select>
              <div>
                {serviceType != "federal" ||
                serviceType != "state" ||
                serviceType != "accounting" ||
                serviceType != "investment" ||
                serviceType != "consulting" ||
                serviceType != "loan/credit" ||
                serviceType != "crm" ? (
                  <div>
                    <label htmlFor='images'>Service Type</label>
                    <input
                      type='text'
                      name='serviceType'
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button
                type='button'
                className='my btn btn-primary btn-block'
                onClick={() => addService(serviceType)}>
                Add Service
              </button>
            </div>
          </div>
        </div>
        <div className='card bg-light'>
          <label htmlFor='images'>Upload Firm Images Here</label>
          <input
            type='file'
            name='fs'
            onChange={readmultifiles}
            style={{ width: "200px" }}
            multiple
          />
          <div className='grid-2'>
            <div className='card'>
              <label htmlFor='images'>Company Logo</label>
              <input
                type='text'
                name='img2'
                value={filebody[0] ? filebody[0].name : current && current.logo}
                onChange={onChange}
              />
            </div>
            <div className='card'>
              <label htmlFor='images'>Featured Employee Picture</label>
              <input
                type='text'
                name='img3'
                value={
                  filebody[1] ? filebody[1].name : current && current.cpapic
                }
                onChange={onChange}
              />
            </div>
          </div>
        </div>

        <br />
        <input
          type='submit'
          className='btn btn-primary btn-block'
          value={current !== null ? "Update Firm" : "Add Firm"}
        />
      </form>
    </div>
  );
};

export default FirmForm;
