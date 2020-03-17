import React from "react"

import FileUpload from "./FileUpload"
import Papa from "papaparse"
import privateFiles from "../client-side-private-files.json"

import { Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from "shards-react"

class BatchStudentUploader extends React.Component {
  state = {
    selectedFile: null,
    helperModalShown: false
  }

  handleChange = e => {
    e.preventDefault()
    let file = e.target.files[0]
    this.setState({ selectedFile: file.type === "text/csv" ? file : null })
  }
  render() {
    const file = this.state.selectedFile
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Batch Upload</h6>
        </CardHeader>
        <p className="ml-3 mt-3" style={{ marginBottom: "0" }}>
          {" "}
          Upload a .csv file to add many students at once. Click{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => this.setState({ helperModalShown: true })}
          >
            here
          </span>{" "}
          for more instructions.
        </p>
        <CardBody className="p-3">
          <form onSubmit={this.handleSubmit}>
            <FileUpload
              onChange={this.handleChange}
              fileName={file ? file.name : null}
              accept=".csv"
              required
            />
            <Button block type="submit">
              Upload
            </Button>
          </form>
        </CardBody>
        <Modal
          open={this.state.helperModalShown}
          toggle={() => this.setState({helperModalShown: false})}
        >
            <ModalBody>
              A spreadsheet containing ONLY a list of names with the corresponding graduation year (not grade), and ID number in the first, second, and third columns, respectively,
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => this.setState({helperModalShown: false})}>Done</Button>
            </ModalFooter>
        </Modal>
      </Card>
    )
  }
  handleSubmit = e => {
    e.preventDefault()
    if (!this.state.selectedFile) return
    Papa.parse(this.state.selectedFile, {
      encoding: "utf-8",
      complete: this.batchDataUploadedAndParsed,
      error: this.unparseableFile
    })
  }

  batchDataUploadedAndParsed = results => {
    this.setState({ selectedFile: null })
    let data = this.validate(results.data)
    if (data.length > 0) {
      let errorArr = []
      let rowsTried = 0
      data.map(async studentArr => {
        const url =
          privateFiles.FIREBASE_ADD_FUNCTION_URL +
          "?name=" +
          studentArr[0] +
          "&studentIDNumber=" +
          studentArr[2] +
          "&graduationYear=" +
          studentArr[1]

        const res = await fetch(url)
        let body = await res.json()
        if (body.error) {
          console.log(studentArr[0] + ": " + body.error)
          errorArr.push(studentArr[0] + ": " + body.error)
        }
        rowsTried++
        if (rowsTried === data.length && errorArr.length > 0)
          alert(
            "An error occured for the following students. They were not added (or re-added) to the system:\n\n" +
              errorArr.join("\n")
          )
        else if (rowsTried === data.length)
          alert("All students uploaded sucessfully")
      })
    } else
      alert(
        "This file is invalid. Please ensure it is correctly formatted and try again."
      )
  }

  unparseableFile = error => {
    this.setState({ selectedFile: null })
    console.log(error)
    alert(
      "An error occured. Please ensure your file is correctly formatted and try again."
    )
  }

  validate = data => {
    return data.filter(
      e => e.length === 3 && !isNaN(Number(e[1])) && !isNaN(Number(e[2]))
    )
  }
}

export default BatchStudentUploader
