import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';

import { useState } from 'react';

function InvoiceForm() {  
    let state0 = {
      isOpen: false,
      currency: '$',
      currentDate: '',
      invoiceNumber: 1,
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billFrom: '',
      billFromEmail: '',
      billFromAddress: '',
      notes: '',
      taxRate: '0.00',
      discountRate: '',
    };

    const [state, setState] = useState(state0);

   let items0 = [
      {
        id: 'xxxx',
        name: '',
        description: '',
        price: '1.00',
        quantity: 1
      }
    ];
    const [items, setItems] = useState(items0);
 
  function handleRowDel(item) {
    //console.log("object: %O", item);
    
    var index = items.indexOf(item);
    let newItems = items.filter((item, ind) => ind !== index);
    setItems(newItems);
  };

  function handleAddEvent(evt) {
    //console.log('in row add');
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var newItem = {
      id: id,
      name: '',
      price: '1.00',
      description: '',
      quantity: 1
    }
    setItems([
      ...items,
      newItem
    ]);
  }
  
  function onItemizedItemEdit(evt) {
    const { id, name, value } = evt.target;
    //console.log(id, name, value);
    
    var newItems = items.map(function(item) {
        if (item.id === id) {
          item[name] = value;
        }
      return item;
    });
    setItems(newItems);
  };
  
  const editField = (event) => {
    //console.log('editField name ' + event.target.name + ' value ' + event.target.value);
    let a = event.target.name;
    setState({
      ...state,
      [a]: event.target.value
    });
  };
  
  const onCurrencyChange = (selectedOption) => {
    setState( {
      ...state,
      currency: selectedOption
    });
  };

  const openModal = (event) => {
    event.preventDefault();
    setState( {
      ...state,
      isOpen: true
    });
  };

  const closeModal = (event) => setState({ ...state, isOpen: false});

    let subTotal = 0;
    for (const item of items) {      
      let a = (parseFloat(item.price) * parseInt(item.quantity));
      subTotal = subTotal + a;
    }
    subTotal = subTotal.toFixed(2);
    let taxAmmount = (subTotal * (parseFloat(state.taxRate) / 100)).toFixed(2);
    let discountAmmount = ((subTotal) * (state.discountRate / 100)).toFixed(2);
    
    //console.log('a ' + subTotal + ' b ' + discountAmmount + ' c ' + taxAmmount);
    let total = (subTotal - discountAmmount) + parseFloat(taxAmmount);
    total = parseFloat(total).toFixed(2);
  
    return (<Form validated={true} onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">         
                  <Form.Label className="fw-bold me-2" column="true">Due&nbsp;Date:</Form.Label>
                  <Form.Control type="date" value={state.dateOfIssue} name={"dateOfIssue"} onChange={(event) => editField(event)} style={{
                      maxWidth: '150px'
                    }} required="required"/>
                </div>
              </div>
              <div className="d-flex align-items-top">
                <Form.Label className="fw-bold me-2" column="true">Invoice&nbsp;Number:&nbsp;</Form.Label>
                <Form.Control type="number" value={state.invoiceNumber} name={"invoiceNumber"} onChange={(event) => editField(event)} min="1" style={{
                    maxWidth: '70px'
                  }} required="required"/>
              </div>
            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control placeholder={"Who is this invoice to?"} rows={3} value={state.billTo} type="text" name="billTo" className="my-2" onChange={(event) => editField(event)} autoComplete="name" required="required"/>

                <Form.Control placeholder={"Email address"} value={state.billToEmail} type="email" name="billToEmail" className="my-2" onChange={(event) => editField(event)} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Billing address"} value={state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(event) => editField(event)} required="required"/>
              </Col>
              
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control placeholder={"Who is this invoice from?"} rows={3} value={state.billFrom} type="text" name="billFrom" className="my-2" onChange={(event) => editField(event)} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Email address"} value={state.billFromEmail} type="email" name="billFromEmail" className="my-2" onChange={(event) => editField(event)} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Billing address"} value={state.billFromAddress} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={(event) => editField(event)} required="required"/>
              </Col>
            </Row>
            <InvoiceItem onItemizedItemEdit={onItemizedItemEdit} onRowAdd={handleAddEvent} onRowDel={handleRowDel} currency={state.currency} items={items}/>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:
                  </span>
                  <span>{state.currency}
                    {subTotal}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({state.discountRate || 0}%)</span>
                    {state.currency}
                    {discountAmmount || 0}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:
                  </span>
                  <span>
                    <span className="small ">({state.taxRate || 0}%)</span>
                    {state.currency}
                    {taxAmmount || 0}</span>
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                  <span className="fw-bold">Total:
                  </span>
                  <span className="fw-bold" id="total">{state.currency}
                    {total || 0}</span>
                </div>
              </Col>
            </Row>
            <hr className="my-4"/>
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control placeholder="Thanks for your business!" name="notes" value={state.notes} onChange={(event) => editField(event)} as="textarea" className="my-2" rows={1}/>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="w-100">Review Invoice</Button>
            
            <InvoiceModal showModal={state.isOpen} closeModal={closeModal} info={state} items={items} subTotal={subTotal} taxAmmount={taxAmmount} discountAmmount={discountAmmount} total={total}/>
            
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select onChange={event => onCurrencyChange(event.target.value)} className="btn btn-light my-1" aria-label="Change Currency">
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="taxRate" type="number" value={state.taxRate} onChange={(event) => editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="discountRate" type="number" value={state.discountRate} onChange={(event) => editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>)
  }

export default InvoiceForm;
