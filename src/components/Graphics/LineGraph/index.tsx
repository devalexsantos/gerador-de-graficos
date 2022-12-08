import { useEffect, useState } from 'react'

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting';

import Offcanvas from 'react-bootstrap/Offcanvas'

import { NotePencil, Plus, Minus, X } from 'phosphor-react'

export const LineGraph = () =>  {

  HighchartsExporting(Highcharts)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [categories, setCategories] = useState(['21/11', '22/11', 'Jan/2022'])
  const [titleGraph, setTitleGraph] = useState('Título do Gráfico')
  const [seriesDados, setSeriesDados] = useState([
    {
      name: 'Exemplo 1',
      data: [2, 1]
    },

    {
      name: 'Exemplo 2',
      data: [2, 3]
    }
  ])
  const [options, setOptions] = useState({
    xAxis: {
      categories
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: seriesDados,
    title: {
      text: titleGraph
    },

    credits: {
      enabled: false
    },

    exporting: {
      buttons: {
        contextButton: {
          enabled: true
        }
      },
      enabled: true,
      
    }
  })

  function handleChangeTitle (e: React.ChangeEvent<HTMLInputElement>, indexSeries: number) {
    seriesDados[indexSeries].name = e.target.value
    setSeriesDados([...seriesDados])
  }

  function handleChangeData (e: React.ChangeEvent<HTMLInputElement>, index:number, indexSeries:number) {
    if (e.target.value === '') {
      seriesDados[indexSeries].data[index] = 0
    } else {
      seriesDados[indexSeries].data[index] = parseInt(e.target.value)
    }

    setSeriesDados([...seriesDados])
  }

  function handleCreateData (e: React.MouseEvent<HTMLElement>, indexSeries: number) {
    e.preventDefault()
    seriesDados[indexSeries].data.push(1)
    setSeriesDados([...seriesDados])
  }

  function handleDeleteData (e: React.MouseEvent<HTMLElement>, index: number, indexSeries:number) {
    e.preventDefault()
    seriesDados[indexSeries].data.splice(index, 1)
    setSeriesDados([...seriesDados])
  }

  function handleDeleteItem (e: React.MouseEvent<HTMLElement>, indexSeries: number) {
    e.preventDefault()
    seriesDados.splice(indexSeries, 1)
    setSeriesDados([...seriesDados])
  }

  function handleCreateItem (e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    seriesDados.push(
      {
        name: 'Nova Categoria',
        data: [0, 1]
      }
    )
    setSeriesDados([...seriesDados])
  }

  function handleChangeTitleGraph (e: React.ChangeEvent<HTMLInputElement>) {
    setTitleGraph(e.target.value)
    setOptions({ ...options })
  }

  function handleChangeCategories (e: React.ChangeEvent<HTMLInputElement>, index: number) {
    categories[index] = e.target.value
    setCategories([...categories])
  }

  useEffect(() => {
    options.series = seriesDados
    options.title.text = titleGraph
    options.xAxis.categories = categories

    setOptions({...options})

    // setOptions({
    //   xAxis: {
    //     categories
    //   },
    //   plotOptions: {
    //     line: {
    //       dataLabels: {
    //         enabled: true
    //       },
    //       enableMouseTracking: false
    //     }
    //   },
    //   series: seriesDados,
    //   title: {
    //     text: titleGraph
    //   },

    //   credits: {
    //     enabled: false
    //   },

    //   exporting: {
    //     buttons: {
    //       contextButton: {
    //         enabled: true
    //       }
    //     },
    //     enabled: true,
        
    //   }
    // })
  }, [seriesDados, titleGraph, categories])

  return (
      <div className="flex justify-center w-[100%]">  
        <div className="flex flex-col w-[100%] max-w-[764px]">
            <div className="flex justify-end items-end">
            <button onClick={handleShow} className=""><NotePencil size={16} className="text-sky-600" /></button>
            </div>
                <HighchartsReact highcharts={Highcharts} options={options} />

            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header>
                <Offcanvas.Title className="w-full"><div className="flex justify-between">Configurações do Gráfico<button onClick={handleClose}><X size={32} weight="bold" /></button></div></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="m-3"><input onChange={(e) => handleChangeTitleGraph(e)} className="border rounded p-2 w-[100%] my-1" value={titleGraph}></input></div>
                    {seriesDados.map((series, indexSeries) => (
                        <div key={indexSeries} className="flex flex-col m-3">
                            <div className="flex justify-around items-center">
                                <input onChange={(e) => handleChangeTitle(e, indexSeries)} value={series.name} className="border rounded p-2 w-[100%] my-1"/>
                                <button onClick={(e) => handleCreateData(e, indexSeries)} className="bg-sky-600 m-1 p-2 rounded-full color-white"><Plus size={16} color={'white'} /></button>
                                <button onClick={(e) => handleDeleteItem(e, indexSeries)} className="bg-red-600 m-1 p-2 rounded-full color-white"><Minus size={16} color={'white'} weight="bold" /></button>
                            </div>
                                <div className="flex flex-col gap-1">
                                    {series.data.map((input, index) => (
                                        <div key={index} className="flex">
                                            <input type="number" onChange={(e) => handleChangeData(e, index, indexSeries)} value={input} className="border rounded p-2 w-[100%]"/>
                                            <input onChange={(e) => handleChangeCategories(e, index)} value={categories[index]} className="border rounded p-2 w-[100%]" />
                                            <button onClick={(eDel) => (handleDeleteData(eDel, index, indexSeries))} ><Minus size={24} color={'white'} weight="bold" className="p-2 m-1 rounded-full bg-red-600 text-white" /></button>
                                        </div>

                                    ))}
                                </div>
                        </div>
                    ))}
                    <button onClick={(e) => handleCreateItem(e)} className="bg-sky-600 rounded p-2 text-white border-none shadow-sm w-[100%]">+ Adicionar Categoria</button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
      </div>
  )
}
