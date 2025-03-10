import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export const exportMedicalRecord = (record: any) => {
  const doc = new jsPDF()

  // Add header
  doc.setFontSize(20)
  doc.text('Hồ sơ bệnh án', 105, 15, { align: 'center' })

  // Add patient info
  doc.setFontSize(12)
  doc.text(`Mã hồ sơ: ${record.id}`, 20, 30)
  doc.text(`Ngày khám: ${format(new Date(record.date), 'dd/MM/yyyy HH:mm', { locale: vi })}`, 20, 40)
  doc.text(`Bác sĩ: ${record.doctor}`, 20, 50)
  doc.text(`Chuyên khoa: ${record.department}`, 20, 60)

  // Add symptoms and diagnosis
  doc.text('Triệu chứng:', 20, 80)
  doc.setFontSize(10)
  doc.text(record.symptoms, 30, 90)
  doc.setFontSize(12)
  doc.text('Chẩn đoán:', 20, 110)
  doc.setFontSize(10)
  doc.text(record.diagnosis, 30, 120)

  // Add prescription table
  if (record.prescription?.medicines?.length) {
    doc.setFontSize(12)
    doc.text('Đơn thuốc:', 20, 140)

    const tableData = record.prescription.medicines.map((medicine: any) => [
      medicine.name,
      medicine.quantity + ' ' + medicine.unit,
      medicine.usage,
      medicine.price.toLocaleString('vi-VN') + ' ₫'
    ])

    doc.autoTable({
      startY: 150,
      head: [['Tên thuốc', 'Số lượng', 'Cách dùng', 'Đơn giá']],
      body: tableData,
      theme: 'grid',
      styles: { font: 'helvetica', fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      margin: { top: 20, right: 20, bottom: 20, left: 20 }
    })
  }

  // Save the PDF
  doc.save(`medical-record-${record.id}.pdf`)
}

export const exportAllMedicalRecords = (records: any[]) => {
  // Similar to above but with multiple records
  const doc = new jsPDF()
  // ...implementation
  doc.save('medical-records.pdf')
}
