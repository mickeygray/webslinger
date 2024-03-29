const mongoose = require("mongoose");

const ComponentSchema = mongoose.Schema({
 name: { type: String },
 area: { type: String },
 html: { type: String },
 content: [
  {
   content: { type: String },
   key: { type: String },
   type: { type: String },
   contentId: { type: String },
  },
 ],
 user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
 userState: { type: Object },
 img: [
  {
   name: { type: String },
   sectionArea: { type: String },
   alt: { type: String },
   type: { type: String },
   background: { type: String },
   code: { type: String },
   height: { type: String },
   width: { type: String },
   sectionOrdinality: { type: Number },
   compStyle: { type: String },
   componentName: { type: String },
  },
 ],
 vid: [
  {
   url: { type: String },
   sectionArea: { type: String },
   height: { type: String },
   type: { type: String },
   width: { type: String },
   autoplay: { type: String },
   sectionOrdinality: { type: Number },
   compStyle: { type: String },
   componentName: { type: String },
  },
 ],
 h: [
  {
   headingSize: { type: String },
   sectionArea: { type: String },
   text: { type: String },
   font: { type: String },
   color: { type: String },
   type: { type: String },
   fontStyle: { type: String },
   background: { type: String },
   faIcon: { type: String },
   faIconPosition: { type: String },
   sectionOrdinality: { type: Number },
   compStyle: { type: String },
   componentName: { type: String },
  },
 ],
 p: [
  {
   type: { type: String },
   sectionArea: { type: String },
   text: { type: String },
   fontStyle: { type: String },
   font: { type: String },
   color: { type: String },
   background: { type: String },
   sectionOrdinality: { type: Number },
   compStyle: { type: String },
   componentName: { type: String },
  },
 ],
 li: [
  {
   sectionArea: { type: String },
   type: { type: String },
   text: { type: String },
   font: { type: String },
   color: { type: String },
   background: { type: String },
   listName: { type: String },
   faIcon: { type: String },
   faIconPosition: { type: String },
   fontStyle: { type: String },
   sectionOrdinality: { type: Number },
   compStyle: { type: String },
   componentName: { type: String },
  },
 ],
 a: [
  {
   sectionArea: { type: String },
   text: { type: String },
   url: { type: String },
   type: { type: String },
   faIcon: { type: String },
   buttonStyle: { type: String },
   faIconPosition: { type: String },
   fontStyle: { type: String },
   font: { type: String },
   background: { type: String },
   color: { type: String },
   sectionOrdinality: { type: Number },
   compStyle: { type: String },
   componentName: { type: String },
  },
 ],
 button: [
  {
   type: { type: String },
   text: { type: String },
   actionComponent1: { type: String },
   actionComponent2: { type: String },
   attachedContent: { type: String },
   code: { type: String },
   defaultState: { type: String },
   direction: { type: String },
   filterParams: [],
   increment: { type: String },
   reductionType: { type: String },
   sectionArea: { type: String },
   font: { type: String },
   color: { type: String },
   background: { type: String },
   faIcon: { type: String },
   faIconPosition: { type: String },
   sectionOrdinality: { type: Number },
  },
 ],

 icon: [
  {
   type: { type: String },
   sectionArea: { type: String },
   faIcon: { type: String },
   background: { type: String },
   color: { type: String },
   sectionOrdinality: { type: Number },
  },
 ],
});

module.exports = mongoose.model("component", ComponentSchema);
