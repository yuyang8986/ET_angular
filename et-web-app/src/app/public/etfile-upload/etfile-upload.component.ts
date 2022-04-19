import { Component, OnInit, Input, NgZone } from '@angular/core';
import { UploadFileService } from '../../main-form/Income/income-details/services/upload-file.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-etfile-upload',
  templateUrl: './etfile-upload.component.html',
  styleUrls: ['./etfile-upload.component.css'],
  providers: [UploadFileService]
})
export class ETFileUploadComponent implements OnInit {
  @Input() btnName: string = "";
  @Input() fileType: string = "";
  @Input() downloadList: any = [];
  pickedFile: File = null;
  pitch: string = "";
  imgList: any = [];
  fileName: string = "";

  constructor(private uploadFile: UploadFileService, private toastr: ToastrService, private zone: NgZone) {
  }

  ngOnInit() {
  }

  onFilePicked(event){
    console.log(1)
    if (event.target.files[0]){   
      this.pickedFile = <File>event.target.files[0]
      this.pitch = ""
      this.fileName = this.pickedFile.name

      let size = Number(this.pickedFile.size)
      let type = this.pickedFile.type
      console.log(this.pickedFile)
      console.log("大小为" + size + 'b')
      console.log("种类为" + type)
    }
    else {
      this.pitch = "* No file selected, please select a file to upload"
      this.pickedFile = null
    }  
  }

  onUpload(){
    let cat = new FormData();

    if (this.pickedFile){
      cat.append('file', this.pickedFile, this.fileType + '-' + this.pickedFile.name);
    }
    
    this.uploadFile.uploadFile(cat).subscribe((resp) => {
      this.pickedFile = null
      this.toastr.success('Upload successfully', 'Success')
    }, (error) => {
      this.toastr.error('Please select a proper file to upload', 'Error')
    })
  }

  removeFile(){
    this.pickedFile = null
    this.fileName = "* Empty file selected"
    
  }


}
