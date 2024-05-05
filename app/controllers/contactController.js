const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactmodel"); // 수정된 경로

// 모든 연락처 정보를 가져오는 함수
// GET /contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();

  // 연락처 정보를 렌더링할 뷰가 "contacts"라고 가정할 때
  res.render("contacts", { contacts }); // 연락처 정보를 뷰에 전달
});
